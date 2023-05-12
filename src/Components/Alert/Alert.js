import { useContext } from "react";
import StatesContext from "../../Contexts/StatesContext";

import "./Alert.css";

const Alert = ({ alertIcon, alertMessage }) => {
  const { showAlert } = useContext(StatesContext);
  return (
    <>
      {showAlert && (
        <div className="alert-box">
          <div className="alert-content">
            {alertIcon}
            <p>{alertMessage}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
