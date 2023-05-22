import { useContext } from "react";

import icons from "../../Assets/Icons";
import contexts from "../../Assets/Contexts";

import "./Alert.css";

const Alert = () => {
  const { alert, setAlert } = useContext(contexts.StatesContext);
  const alertStyle = () => {
    switch (alert.type) {
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
              <icons.CloseRoundedIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
