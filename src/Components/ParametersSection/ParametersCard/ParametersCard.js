import { cloneElement } from "react";
import "./ParametersCard.css";

const ParametersCard = ({ icon, title, value, iconColor }) => {
  return (
    <div className="parameters-card">
      <div className="parameters-icon-title">
        {cloneElement(icon, { style: { color: iconColor } })}
        <span>{title}</span>
      </div>
      <div className="parameters-value">
        <span style={{ color: iconColor }}>{value}</span>
      </div>
    </div>
  );
};

export default ParametersCard;
