import { useContext } from "react";
import StatesContext from "../../Contexts/StatesContext";

import icons from "../../Assets/Icons";

import "./Alert.css";

const Alert = ({ alertType, alertMessage }) => {
  const { showAlert } = useContext(StatesContext);
  const alertStyle = () => {
    switch (alertType) {
      case "success":
        return <icons.CheckCircleOutlineRoundedIcon />;
      case "error":
        return <icons.ErrorOutlineRoundedIcon />;
      case "warning":
        return <icons.WarningAmberRoundedIcon />;
      case "info":
        return <icons.InfoOutlinedIcon />;
      default:
        return null;
    }
  };
  return (
    <>
      {showAlert && (
        <div className={"alert-box " + alertType}>
          <div className="alert-content">
            {alertStyle()}
            <p>{alertMessage}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
