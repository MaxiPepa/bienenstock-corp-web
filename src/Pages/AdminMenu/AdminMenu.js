import API from "../../Hooks/API/API";
import Table from "../../Components/Tables/Table";
import useRedirect from "../../Hooks/Redirect/useRedirect";
import { USER, THEADUSER, ROLES } from "../../Assets/Constants";
import { useEffect, useState } from "react";

const AdminMenu = () => {
  const [users, setUsers] = useState([]);
  useRedirect(USER.role, ROLES.ADMIN);

  useEffect(() => {
    new API().get("user/getUsers").then((data) => {
      setUsers(
        data.users.map((r) => ({
          fullName: r.fullName,
          userId: r.userId,
          email: r.email,
          userType: r.userType,
        }))
      );
    });
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <Table content={users} thead={THEADUSER} />
    </div>
  );
};

export default AdminMenu;
