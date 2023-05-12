import { useContext } from "react";
import useRedirect from "../../Hooks/Redirect/useRedirect";
import UserContext from "../../Contexts/UserContext";
import { ROLES } from "../../Assets/Constants";

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
