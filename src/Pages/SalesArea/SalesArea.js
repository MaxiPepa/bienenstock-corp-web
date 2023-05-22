import { useContext } from "react";
import useRedirect from "../../Hooks/Redirect/useRedirect";
import UserContext from "../../Contexts/UserContext";
import { ROLES } from "../../Assets/Constants";

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
