import React from "react";
import NavLink from "../NavLink/NavLink";

import "./Sidebar.css";

import { NAVLINKS, USER, ROLES } from "../../Assets/Constants";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";

const Sidebar = ({ isVisible, setIsVisible }) => {
  const hideSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={isVisible ? "sidebar open" : "sidebar"}>
      <div className="user-card">
        <div className="user-profile">
          <AccountCircleSharpIcon />
          <p>{USER.name}</p>
        </div>
        <span>{USER.role}</span>
      </div>
      <nav>
        <ul>
          {NAVLINKS.map((navlink) => {
            return navlink.roles === "All" ||
              navlink.roles === USER.role ||
              USER.role === ROLES.ADMIN ? (
              <NavLink
                navigation={navlink.navigation}
                aditionalFunction={hideSidebar}
                icon={navlink.icon}
                navItemName={navlink.navItemName}
              />
            ) : null;
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
