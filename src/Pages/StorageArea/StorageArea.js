import React from "react";
import useRedirect from "../../Hooks/Redirect/useRedirect";
import { USER, ROLES } from "../../Assets/Constants";

const StorageArea = () => {
  useRedirect(USER.role, ROLES.DEPOSITOR);
  return (
    <div>
      <h2>StorageArea</h2>
    </div>
  );
};

export default StorageArea;
