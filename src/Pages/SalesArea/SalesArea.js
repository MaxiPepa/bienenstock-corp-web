import React from "react";
import useRedirect from "../../Hooks/Redirect/useRedirect";
import { USER, ROLES } from "../../Assets/Constants";

const SalesArea = () => {
  useRedirect(USER.role, ROLES.SELLER);
  return (
    <div>
      <h2>SalesArea</h2>
    </div>
  );
};

export default SalesArea;
