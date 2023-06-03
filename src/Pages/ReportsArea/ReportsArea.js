import { useContext } from "react";
import { ROLES } from "Assets/Constants";

import { UserContext } from "Contexts";
import { useRedirect } from "Hooks";

const ReportsArea = () => {
  const { userData } = useContext(UserContext);
  useRedirect(userData.userType, ROLES.ANALYST);
  return (
    <div>
      <h2 className="area-title">ReportsArea</h2>
    </div>
  );
};

export default ReportsArea;
