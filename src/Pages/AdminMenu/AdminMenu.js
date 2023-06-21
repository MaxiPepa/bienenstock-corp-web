import { useEffect, useState, useContext, useCallback } from "react";
import * as Reader from "Assets/Reader";

import {
  Button,
  Table,
  Modal,
  ConfirmationForm,
  UserForm,
  UserModifyForm,
} from "Components";
import { APIContext, StatesContext } from "Contexts";
import {
  AddRoundedIcon,
  BorderColorIcon,
  DeleteForeverIcon,
  ArrowCircleUpIcon,
} from "Assets/Icons";

import "./AdminMenu.css";

const AdminMenu = () => {
  const [modifyUser, setModifyUser] = useState({});
  const [userId, setUserId] = useState();
  const [users, setUsers] = useState([]);
  const [completeInputValue, setCompleteInputValue] = useState(false);
  const [userModal, setUserModal] = useState(false);

  const { get, post } = useContext(APIContext);
  const { setShowModal, setAlert } = useContext(StatesContext);
  const [connection, setConnection] = useState(null);

  const openConfirmationModal = useCallback(
    (userId) => {
      setUserId(userId);
      setShowModal(true);
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

  const activateUser = useCallback(
    (id) => {
      post("user/activateUser", { userId: id }).then((res) => {
        setAlert({
          show: true,
          message: res.message,
          type: res.success ? "success" : "error",
        });
      });
    },
    [post, setAlert]
  );

  const getUsers = useCallback(() => {
    get("user/getUsers").then((data) => {
      setUsers(
        data.users.map((r) => {
          const auxUser = {
            userId: r.userId,
            name: r.name,
            lastName: r.lastName,
            email: r.email,
            userType: r.userType,
          };
          return r.active
            ? {
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
                ),
              }
            : {
                ...auxUser,
                active: (
                  <Button
                    styles={"table-button-style confirm-style"}
                    buttonFunction={() => activateUser(r.userId)}
                    buttonIcon={<ArrowCircleUpIcon />}
                  />
                ),
              };
        })
      );
    });
  }, [activateUser, get, modifyUserHandler, openConfirmationModal]);

  useEffect(() => {
    getUsers();
    setConnection(Reader.listen(getUsers, "page", "adminHub", "UserUpdate"));
  }, [getUsers]);

  useEffect(() => {
    return () => {
      Reader.stop(connection);
    };
  }, [connection]);

  const deleteUser = () => {
    post("user/deleteUser", { userId: userId }).then((res) => {
      setAlert({
        show: true,
        message: res.message,
        type: res.success ? "success" : "error",
      });
    });
  };

  const openUserModal = () => {
    setShowModal(true);
    setUserModal(true);
  };

  return (
    <div className="area-container">
      <div className="area-header">
        <h2 className="area-title">Admin Menu</h2>
        <Button
          styles="area-button"
          buttonFunction={openUserModal}
          buttonIcon={<AddRoundedIcon />}
          buttonText="New User"
        />
      </div>
      <hr className="division-horizontal-hr" />
      <Table
        content={users.filter((u) => u.edit)}
        thead={[
          "Name",
          "Last Name",
          "Email",
          "User Type",
          "Modify user",
          "Delete user",
        ]}
        mapKeys={["name", "lastName", "email", "userType", "edit", "delete"]}
        entity="users"
        tableId={"pending-products-table"}
      />
      <h2>Inactive Users</h2>
      <Table
        content={users.filter((u) => u.active)}
        thead={["Name", "Last Name", "Email", "User Type", "Activate"]}
        mapKeys={["name", "lastName", "email", "userType", "active"]}
        entity="users inactive"
        tableId={"pending-products-table"}
      />
      <Modal
        modalTitle={
          userModal
            ? "New User"
            : completeInputValue
            ? "Modify User"
            : "Delete User"
        }
        modalId={
          !userModal && !completeInputValue ? "confirmation-modal" : null
        }
        setUserModal={setUserModal}
        setCompleteInputValue={setCompleteInputValue}
      >
        {userModal ? (
          <UserForm setUserModal={setUserModal} />
        ) : completeInputValue ? (
          <UserModifyForm
            user={modifyUser}
            setCompleteInputValue={setCompleteInputValue}
          />
        ) : (
          <ConfirmationForm
            onConfirm={deleteUser}
            actionText={"delete this user"}
          />
        )}
      </Modal>
    </div>
  );
};

export default AdminMenu;
