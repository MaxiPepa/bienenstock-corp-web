import { useContext } from "react";
import { ROLES } from "../../Assets/Constants";

import contexts from "../../Assets/Contexts";
import hooks from "../../Assets/Hooks";

const SalesArea = () => {
  const { userData } = useContext(contexts.UserContext);
  hooks.useRedirect(userData.userType, ROLES.SELLER);
  return (
    <div>
      <h2 className="area-title">SalesArea</h2>
    </div>
  );
};

export default SalesArea;
