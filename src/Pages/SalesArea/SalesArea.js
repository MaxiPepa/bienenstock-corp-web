import { useContext } from "react";
import { ROLES } from "Assets/Constants";

import { UserContext } from "Contexts";
import { useRedirect } from "Hooks";

const SalesArea = () => {
  const { userData } = useContext(UserContext);
  useRedirect(userData.userType, ROLES.SELLER);
  return (
    <div>
      <h2 className="area-title">SalesArea</h2>
    </div>
  );
};

export default SalesArea;
