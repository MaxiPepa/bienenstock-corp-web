import { useEffect, useState, useContext } from "react";
import APIContext from "../../Contexts/APIContext";
import UserContext from "../../Contexts/UserContext";
import StatesContext from "../../Contexts/StatesContext";
import useRedirect from "../../Hooks/Redirect/useRedirect";

import Table from "../../Components/Tables/Table";
import Button from "../../Components/Button/Button";
import Modal from "../../Components/Modal/Modal";

import { ROLES } from "../../Assets/Constants";

import "./AdminMenu.css";
import icons from "../../Assets/Icons";

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
          buttonIcon={<icons.AddRoundedIcon />}
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
