import { useEffect, useState, useContext } from "react";

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

  const [index,setIndex] = useState();
  const [idUser,setIdUser] = useState();
  const [users, setUsers] = useState([]);
  const [modalConfirm,setModalConfirm] = useState(false);
  const [completeInputValue,setCompleteInputValue] = useState(false);

  const { get,post } = useContext(APIContext);
  const { userData } = useContext(UserContext);
  const { setShowModal } = useContext(StatesContext);
  
  
  useRedirect(userData.userType, ROLES.ADMIN);

  useEffect(() => {
    get("user/getUsers").then((data) => {
      setUsers(
        data.users.map((r) => ({
          userId: r.userId,
          name: r.name, 
          lastName: r.lastName,
          email: r.email,
          userType: r.userType,
        }))
      );
    });
  }, [get]);

  const openModal = () => {
    setShowModal(true);
  };

  const openConfirmationModal = (index) =>{
    setIdUser(index)
    openModal()
    setModalConfirm(true)  

  }

  const deleteUser = () => {
    
    console.log("el Id del user a eliminar es:" + users[idUser].userId)
    console.log(idUser)
    // post("user/deleteUser",index)
    //   .then(()=>{
    //     setAlert({
    //       show: true,
    //       message: "User deleted",
    //       type: "success",
    //     });
    // })  
  };

  const modifyUser = async (index) => {
    openModal()
    setModalConfirm(false)
    setCompleteInputValue(true)
    setIndex(index)
    console.log(users[index])
    //Hacer modal para confirmar modify user.


  }

  const usersContent = users.map((item, index) => ({
    ...item,
    Edit: (
      <Button
        styles={"table-buttons details-icon"}
        buttonIcon={<BorderColorIcon />}
        buttonFunction={() => modifyUser(index) }
      />
    ),
    Delete:(
      <Button
        styles={"table-buttons cancel-icon"}
        buttonFunction={() => openConfirmationModal(index)}
        buttonIcon={<DeleteForeverIcon />}
      />
    ),
  }));

  return (
    <div className="area-container">
      <div className="area-header">
        <h2 className="area-title">Admin Menu</h2>
        <Button
          styles="area-button"
          buttonFunction={openModal}
          buttonIcon={<AddRoundedIcon />}
          buttonText="New User"
        />
      </div>
      <hr className="division-horizontal-hr" />
      <Table content={usersContent} thead={["ID","Name", "Last Name", "Email", "UserType","Modify user","Delete user"]} />
      <Modal modalTitle="User">
        { 
          modalConfirm ? <ConfirmationForm functionFather={deleteUser} /> : 
          completeInputValue? <UserModifyForm user={users[index]} /> : <UserForm/>
        }
      </Modal>
    </div>
  );
};

export default AdminMenu;
