import { useContext } from "react";

import { StatesContext } from "../../Assets/Contexts";
import {
  CheckCircleOutlineRoundedIcon,
  ErrorOutlineRoundedIcon,
  WarningAmberRoundedIcon,
  InfoOutlinedIcon,
  CloseRoundedIcon,
} from "../../Assets/Icons";

import "./Alert.css";

const Alert = () => {
  const { alert, setAlert } = useContext(StatesContext);
  const alertStyle = () => {
    switch (alert.type) {
      case "success":
        return <CheckCircleOutlineRoundedIcon />;
      case "error":
        return <ErrorOutlineRoundedIcon />;
      case "warning":
        return <WarningAmberRoundedIcon />;
      case "info":
        return <InfoOutlinedIcon />;
      default:
        return null;
    }
  };

  const closeAlertHandler = () => {
    setAlert({
      show: false,
      message: "",
      type: "",
    });
  };

  return (
    <>
      {alert.show && (
        <div className={"alert-box " + alert.type}>
          <div className="alert-content">
            {alertStyle()}
            <p>{alert.message}</p>
            <button className="close-alert-button" onClick={closeAlertHandler}>
              <CloseRoundedIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
