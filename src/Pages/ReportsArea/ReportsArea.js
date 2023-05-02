import React from "react";
import useRedirect from "../../Hooks/Redirect/useRedirect";
import { USER, ROLES } from "../../Assets/Constants";

const ReportsArea = () => {
  useRedirect(USER.role, ROLES.ANALYST);
  return (
    <div>
      <h2>ReportsArea</h2>
    </div>
  );
};

export default ReportsArea;
