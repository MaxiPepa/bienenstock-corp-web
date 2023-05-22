import { useEffect, useState, useContext } from "react";

import { ROLES } from "../../Assets/Constants";

import { Button, Table, Modal } from "../../Assets/Components";
import { APIContext, StatesContext, UserContext } from "../../Assets/Contexts";
import { useRedirect } from "../../Assets/Hooks";
import { AddRoundedIcon } from "../../Assets/Icons";

import "./AdminMenu.css";

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

  return (
    <div className="admin-menu">
      <div className="admin-header">
        <h2 className="area-title">Admin Menu</h2>
        <Button
          styles="admin-button"
          buttonFunction={openModal}
          buttonIcon={<AddRoundedIcon />}
          buttonText="New User"
        />
      </div>
      <hr className="division-horizontal-hr" />
      <Table content={users} thead={["Full Name", "Email", "UserType"]} />
      <Modal modalTitle="New User"></Modal>
    </div>
  );
};

export default AdminMenu;
