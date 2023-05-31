import { useContext } from "react";
import { ROLES } from "../../Assets/Constants";

import { PendingEntrySection } from "../../Assets/Components";
import { UserContext } from "../../Assets/Contexts";
import { useRedirect } from "../../Assets/Hooks";

import "./StorageArea.css";

const StorageArea = () => {
  const { userData } = useContext(UserContext);

  useRedirect(userData.userType, ROLES.DEPOSITOR);

  return (
    <div className="area-container">
      <div className="area-header">
        <h2 className="area-title">StorageArea</h2>
      </div>
      <hr className="division-horizontal-hr" />
      <PendingEntrySection />
      <section>
        <h3 className="area-subtitle">Pending products release</h3>
      </section>
    </div>
  );
};

export default StorageArea;
