import React from "react";
import useRedirect from "../../Hooks/Redirect/useRedirect";
import { USER, ROLES } from "../../Assets/Constants";

const PurchansingArea = () => {
  useRedirect(USER.role, ROLES.BUYER);
  return (
    <div>
      <h2>PurchasesArea</h2>
    </div>
  );
};

export default PurchansingArea;
