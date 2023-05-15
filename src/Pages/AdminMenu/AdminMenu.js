import { useEffect, useState, useContext } from "react";
import APIContext from "../../Contexts/APIContext";
import UserContext from "../../Contexts/UserContext";
import useRedirect from "../../Hooks/Redirect/useRedirect";

import Table from "../../Components/Tables/Table";

import { THEADUSER, ROLES } from "../../Assets/Constants";

import "./AdminMenu.css";

const AdminMenu = () => {
  const [users, setUsers] = useState([]);
  const { get } = useContext(APIContext);
  const { userData } = useContext(UserContext);

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

  return (
    <div>
      <h2 className="area-title">Users</h2>
      <Table content={users} thead={THEADUSER} />
    </div>
  );
};

export default AdminMenu;
