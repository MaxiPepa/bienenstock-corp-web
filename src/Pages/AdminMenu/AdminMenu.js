import { useEffect, useState, useContext, useCallback } from "react";

import { ROLES } from "Assets/Constants";
import { UserModifyForm } from "../../Components/UsersForm/UserModifyForm";

import { Button, Table, Modal, ConfirmationForm, UserForm } from "Components";
import { useRedirect } from "Hooks";
import { APIContext, StatesContext, UserContext } from "Contexts";
import {
  AddRoundedIcon,
  BorderColorIcon,
  DeleteForeverIcon,
  ArrowCircleUpIcon
} from "../../Assets/Icons";

import "./AdminMenu.css";

const AdminMenu = () => {
  let auxUser = {};

  const [modifyUser, setModifyUser] = useState({});
  const [UserId, setUserId] = useState();
  const [users, setUsers] = useState([]);
  const [inactiveUsers,setInactivateUser] = useState([])
  const [modalConfirm, setModalConfirm] = useState(false);
  const [completeInputValue, setCompleteInputValue] = useState(false);

  const { get, post } = useContext(APIContext);
  const { userData } = useContext(UserContext);
  const { setShowModal, setAlert } = useContext(StatesContext);

  useRedirect(userData.userType, ROLES.ADMIN);

  const openConfirmationModal = useCallback(
    (userId) => {
      setUserId(userId);
      setShowModal(true);
      setModalConfirm(true);
    },
    [setShowModal]
  );

  const modifyUserHandler = useCallback(
    (user) => {
      setModifyUser(user);
      setShowModal(true);
      setCompleteInputValue(true);
    },
    [setShowModal]
  );

  useEffect(() => {
    get("user/getUsers").then((data) => {
      setUsers( 
        data.users.map((r) => { 
          auxUser = {
            userId: r.userId,
            name: r.name,
            lastName: r.lastName,
            email: r.email,
            userType: r.userType,
          }
          return r.active?{
            ...auxUser,
          edit: (
              <Button
                styles={"table-button-style edit-style"}
                buttonIcon={<BorderColorIcon />}
                buttonFunction={() => modifyUserHandler(r)}
              />
            ),
            delete: (
              <Button
                styles={"table-button-style cancel-style"}
                buttonFunction={() => openConfirmationModal(r.userId)}
                buttonIcon={<DeleteForeverIcon />}
              />
            )
          }:
          {
            ...auxUser,
            active: (
              <Button
                styles={"table-button-style info-style"}
                buttonFunction={() => activateUser(r.userId)}
                buttonIcon={<ArrowCircleUpIcon />}
              />
            )
          }
        })
      )
    });
  }, [get, modifyUserHandler, openConfirmationModal]);

  const deleteUser = () => {
    const rq = { userId: UserId };
    post("user/deleteUser", rq).then((rs) => {
      setAlert({
        show: true,
        message: rs.message,
        type: rs.success ? "success" : "error",
      });
    });
  };

  const activateUser = (id) => {
    post("user/activateUser", {userId:id}).then((rs) => {
      setAlert({
        show: true,
        message: rs.message,
        type: rs.success ? "success" : "error",
      });
    });
  }

  return (
    <div className="area-container">
      <div className="area-header">
        <h2 className="area-title">Admin Menu</h2>
        <Button
          styles="area-button"
          buttonFunction={() => setShowModal(true)}
          buttonIcon={<AddRoundedIcon />}
          buttonText="New User"
        />
      </div>
      <hr className="division-horizontal-hr" />
      <Table
        content={users.filter((u) => u.edit )}
        thead={[ "ID","Name","Last Name","Email","UserType","Modify user","Delete user"]}
        mapKeys={["userId","name","lastName","email","userType","edit","delete"]}
        entity="users"
      />
      <hr className="division-horizontal-hr" />
      <h2>Inactive Users</h2>
      <Table 
        content={users.filter((u) => u.active )}
        thead={[ "ID","Name","Last Name","Email","UserType","active"]}
        mapKeys={["userId","name","lastName","email","userType","active"]}
        entity="users"
      />
      <Modal
        modalTitle="User"
        setModalConfirm={setModalConfirm}
        setCompleteInputValue={setCompleteInputValue}
      >
        {modalConfirm ? (
          <ConfirmationForm
            functionFather={deleteUser}
            setModalConfirm={setModalConfirm}
            setCompleteInputValue={setCompleteInputValue}
          />
        ) : completeInputValue ? (
          <UserModifyForm user={modifyUser} />
        ) : (
          <UserForm />
        )}
      </Modal>
    </div>
  );
};

export default AdminMenu;
