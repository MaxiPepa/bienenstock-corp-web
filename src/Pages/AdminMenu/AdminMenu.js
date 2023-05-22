import { useEffect, useState, useContext } from "react";

import { ROLES } from "../../Assets/Constants";

import "./AdminMenu.css";
import icons from "../../Assets/Icons";
import components from "../../Assets/Components";
import contexts from "../../Assets/Contexts";
import hooks from "../../Assets/Hooks";

const AdminMenu = () => {
  const [users, setUsers] = useState([]);
  const { get } = useContext(contexts.APIContext);
  const { userData } = useContext(contexts.UserContext);
  const { setShowModal } = useContext(contexts.StatesContext);

  hooks.useRedirect(userData.userType, ROLES.ADMIN);

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
        <components.Button
          styles="admin-button"
          buttonFunction={openModal}
          buttonIcon={<icons.AddRoundedIcon />}
          buttonText="New User"
        />
      </div>
      <hr className="division-horizontal-hr" />
      <components.Table
        content={users}
        thead={["Full Name", "Email", "UserType"]}
      />
      <components.Modal modalTitle="New User"></components.Modal>
    </div>
  );
};

export default AdminMenu;
