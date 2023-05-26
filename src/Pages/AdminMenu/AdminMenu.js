import { useEffect, useState, useContext } from "react";

import { ROLES } from "../../Assets/Constants";

import { Button, Table, Modal } from "../../Assets/Components";
import { APIContext, StatesContext, UserContext } from "../../Assets/Contexts";
import { useRedirect } from "../../Assets/Hooks";
import {
  AddRoundedIcon,
  BorderColorIcon,
  DeleteForeverIcon,
} from "../../Assets/Icons";

import "./AdminMenu.css";
import UserForm from "../../Components/UsersForm/UserForm";

const AdminMenu = () => {
  const [users, setUsers] = useState([]);
  const { get } = useContext(APIContext);
  const { userData } = useContext(UserContext);
  const { setShowModal } = useContext(StatesContext);

  useRedirect(userData.userType, ROLES.ADMIN);

  useEffect(() => {
    get("user/getUsers").then((data) => {
      setUsers(
        data.users.map((r) => ({
          fullName: r.fullName,
          email: r.email,
          userType: r.userType,
        }))
      );
    });
  }, [get]);

  const openModal = () => {
    setShowModal(true);
  };

  const usersContent = users.map((item, index) => ({
    ...item,
    Details: (
      <Button
        styles={"table-buttons details-icon"}
        buttonIcon={<BorderColorIcon />}
      />
    ),
    Cancel: (
      <Button
        styles={"table-buttons cancel-icon"}
        buttonFunction={() => {
          console.log("delete user ", index);
        }}
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
      <Table
        content={usersContent}
        thead={["Full Name", "Email", "UserType", "Modify user", "Delete user"]}
      />
      <Modal modalTitle="New User">
        <UserForm />
      </Modal>
    </div>
  );
};

export default AdminMenu;
