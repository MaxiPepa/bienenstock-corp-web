import { useContext } from "react";
import { ROLES } from "../../Assets/Constants";

import contexts from "../../Assets/Contexts";
import hooks from "../../Assets/Hooks";

const ReportsArea = () => {
  const { userData } = useContext(contexts.UserContext);
  hooks.useRedirect(userData.userType, ROLES.ANALYST);
  return (
    <div>
      <h2 className="area-title">ReportsArea</h2>
    </div>
  );
};

export default ReportsArea;
