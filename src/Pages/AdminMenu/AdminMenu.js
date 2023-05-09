import { useEffect, useState, useContext } from "react";
import APIContext from "../../Contexts/APIContext";
import Table from "../../Components/Tables/Table";
import useRedirect from "../../Hooks/Redirect/useRedirect";
import { USER, THEADUSER, ROLES } from "../../Assets/Constants";

const AdminMenu = () => {
  const [users, setUsers] = useState([]);
  useRedirect(USER.role, ROLES.ADMIN);

  const { get } = useContext(APIContext);

  useEffect(() => {
    const getUsers = async () => {
      await get("user/getUsers").then((data) => {
        setUsers(
          data.users.map((r) => ({
            userId: r.userId,
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
      <h2>Users</h2>
      <Table content={users} thead={THEADUSER} />
    </div>
  );
};

export default AdminMenu;
