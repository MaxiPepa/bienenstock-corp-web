import { useContext } from "react";
import { ROLES } from "../../Assets/Constants";

import "./StorageArea.css";

import contexts from "../../Assets/Contexts";
import hooks from "../../Assets/Hooks";

const StorageArea = () => {
  const { userData } = useContext(contexts.UserContext);
  hooks.useRedirect(userData.userType, ROLES.DEPOSITOR);

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
