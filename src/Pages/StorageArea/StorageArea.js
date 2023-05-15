import { useContext } from "react";
import useRedirect from "../../Hooks/Redirect/useRedirect";
import { ROLES } from "../../Assets/Constants";

import UserContext from "../../Contexts/UserContext";

import "./StorageArea.css";

const StorageArea = () => {
  const { userData } = useContext(UserContext);
  useRedirect(userData.userType, ROLES.DEPOSITOR);

  return (
    <div>
      <h2 className="area-title">StorageArea</h2>
      <section>
        <h3 className="area-subtitle">Pending product entry</h3>
      </section>
      <section>
        <h3 className="area-subtitle">Pending products release</h3>
      </section>
    </div>
  );
};

export default StorageArea;
