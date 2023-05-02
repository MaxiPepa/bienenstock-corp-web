import React from "react";
import useRedirect from "../../Hooks/Redirect/useRedirect";
import { USER, ROLES } from "../../Assets/Constants";

const Users = () => {
  useRedirect(USER.role, ROLES.ADMIN);
  return (
    <div>
      <h2>Users</h2>
    </div>
  );
};

export default Users;
