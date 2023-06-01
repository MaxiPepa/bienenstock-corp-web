import { useEffect, useState, useContext, useCallback } from "react";

import { ROLES } from "../../Assets/Constants";

import { useRedirect } from "../../Assets/Hooks";
import { Button, Table, Modal } from "../../Assets/Components";
import { APIContext, StatesContext, UserContext } from "../../Assets/Contexts";
import { AddRoundedIcon,BorderColorIcon,DeleteForeverIcon } from "../../Assets/Icons";

import "./AdminMenu.css";
import UserForm  from "../../Components/UsersForm/UserForm";
import {UserModifyForm} from "../../Components/UsersForm/UserModifyForm";

import ConfirmationForm from "../../Components/ConfirmationForm/ConfirmationForm";

const AdminMenu = () => {

  const [modifyUser,setModifyUser] = useState();
  const [idUser,setIdUser] = useState();
  const [users, setUsers] = useState([]);
  const [modalConfirm,setModalConfirm] = useState(false);
  const [completeInputValue,setCompleteInputValue] = useState(false);

  const { get,post } = useContext(APIContext);
  const { userData } = useContext(UserContext);
  const { setShowModal,setAlert } = useContext(StatesContext);
  
  useRedirect(userData.userType, ROLES.ADMIN);

  const openConfirmationModal = useCallback((userId) =>{
    setIdUser(userId)
    setShowModal(true)
    setModalConfirm(true)  
  },[setShowModal])

  const modifyUserHandler = useCallback((userId) => {
    setShowModal(true)
    setModalConfirm(false)
    setCompleteInputValue(true)
    setModifyUser(users.find((user)=> user.userId === userId))
//    Hacer modal para confirmar modify user.
  },[setShowModal])

  useEffect(() => {
    console.log("loop en AdminMenu")
    get("user/getUsers").then((data) => {
      setUsers(
        data.users.map((r) => ({
          userId: r.userId,
          name: r.name, 
          lastName: r.lastName,
          email: r.email,
          userType: r.userType,
          edit: (
            <Button
              styles={"table-button-style info-style"}
              buttonIcon={<BorderColorIcon />}
              buttonFunction={() => modifyUserHandler(r.userId) }
            />
          ),
          delete:(
            <Button
              styles={"table-button-style cancel-style"}
              buttonFunction={() => openConfirmationModal(r.userId)}
              buttonIcon={<DeleteForeverIcon />}
            />
          )
        }))
      );
    });
  }, [get,openConfirmationModal,modifyUserHandler]);

  const deleteUser = () => {
    const rq = { userId : idUser}    
    post("user/deleteUser",rq)
      .then((rs)=>{
        setAlert({
          show: true,
          message: rs.message,
          type: rs.success?"success":"error",
        });
    })  
  };

  return (
    <div className="area-container">
      <div className="area-header">
        <h2 className="area-title">Admin Menu</h2>
        <Button
          styles="area-button"
          buttonFunction={()=>setShowModal(true)}
          buttonIcon={<AddRoundedIcon />}
          buttonText="New User"
        />
      </div>
      <hr className="division-horizontal-hr" />
      <Table 
        content={users} 
        thead={["ID","Name", "Last Name", "Email", "UserType","Modify user","Delete user"]} 
        mapKeys={["userId","name","lastName","email","userType","edit","delete"]}
      />
      <Modal modalTitle="User">
        { 
          modalConfirm ? <ConfirmationForm functionFather={deleteUser} /> : 
          completeInputValue? <UserModifyForm user={modifyUser} /> : <UserForm/>
        }
      </Modal>
    </div>
  );
};

export default AdminMenu;
