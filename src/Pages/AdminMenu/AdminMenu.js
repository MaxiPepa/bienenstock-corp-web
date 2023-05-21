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
import UserForm from "../../Components/UsersForm/UserForm";

const AdminMenu = () => {
  const [users, setUsers] = useState([]);
  const { get } = useContext(APIContext);
  const { userData } = useContext(UserContext);
  const { setShowModal } = useContext(StatesContext);

  useRedirect(userData.userType, ROLES.ADMIN);

  useEffect(() => {
    const getUsers = async () => {
      await get("user/getUsers").then((data) => {
        setUsers(
          data.users.map((r) => ({
            fullName: r.fullName,
            email: r.email,
            userType: r.userType,
          }))
        );
      });
    };
    getUsers();
  }, [get]);

  const openModal = () => {
    setShowModal(true);
  };

  const usersContent = users.map((item, index) => ({
    ...item,
    Details: (
      <Button
        styles={"table-buttons details-icon"}
        buttonIcon={<icons.BorderColorIcon />}
      />
    ),
    Cancel:(
      <Button
        styles={"table-buttons cancel-icon"}
        buttonFunction={() => {
          console.log("delete user ", index);
        }}
        buttonIcon={<icons.DeleteForeverIcon />}
      />
    ),
  }));

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
      <Table content={usersContent} thead={["Full Name", "Email", "UserType","Modify user","Delete user"]} />
      <Modal modalTitle="New User">
        <UserForm/>
      </Modal>
    </div>
  );
};

export default AdminMenu;
