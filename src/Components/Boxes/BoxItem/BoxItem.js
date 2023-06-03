import { useNavigate } from "react-router-dom";

import { ArrowCircleRightRoundedIcon } from "Assets/Icons";

import "./BoxItem.css";

const BoxItem = ({ quantity, title, icon, color, navigation }) => {
  const navigate = useNavigate();
  const boxStyle = {
    backgroundColor: color,
  };
  return (
    <button
      className="box"
      style={boxStyle}
      onClick={() => navigate(navigation)}
    >
      <div className="box-main-content">
        <div className="box-content-info">
          <p className="box-quantity">{quantity}</p>
          <p className="box-title">{title}</p>
        </div>
        {icon}
      </div>
      <div className="box-footer">
        <p>More Info</p>
        <ArrowCircleRightRoundedIcon />
      </div>
    </button>
  );
};

export default BoxItem;
