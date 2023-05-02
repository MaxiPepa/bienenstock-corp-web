import { Link } from "react-router-dom";

import "./NavLink.css";

const NavLink = ({ navigation, aditionalFunction, icon, navItemName }) => {
  return (
    <li>
      <Link to={navigation} onClick={aditionalFunction}>
        {icon}
        <span>{navItemName}</span>
      </Link>
    </li>
  );
};

export default NavLink;
