import React from "react";
import NavLink from "../NavLink/NavLink";

import "./Sidebar.css";

import { NAVLINKS, USER, ROLES } from "../../Assets/Constants";

import icons from "../../Assets/Icons";

const Sidebar = ({ isVisible, setIsVisible }) => {
  const hideSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={isVisible ? "sidebar open" : "sidebar"}>
      <div className="user-card">
        <div className="user-profile">
          <icons.AccountCircleSharpIcon />
          <p>{USER.name}</p>
        </div>
        <span>{USER.role}</span>
      </div>
      <nav>
        <ul>
          {NAVLINKS.map((navlink, index) => {
            return navlink.roles === "All" ||
              navlink.roles === USER.role ||
              USER.role === ROLES.ADMIN ? (
              <NavLink
                key={index}
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
