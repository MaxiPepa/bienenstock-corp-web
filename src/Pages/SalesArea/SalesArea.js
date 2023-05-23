import { useContext } from "react";
import { ROLES } from "../../Assets/Constants";

import { UserContext } from "../../Assets/Contexts";
import { useRedirect } from "../../Assets/Hooks";

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
