import React from "react";
import NavLink from "../NavLink/NavLink";
import Cookies from "universal-cookie";

import { NAVLINKS, USER, ROLES, COOKIENAME } from "../../Assets/Constants";

import icons from "../../Assets/Icons";
import "./Sidebar.css";

const Sidebar = ({ isVisible, setIsVisible }) => {
  const cookies = new Cookies();

  const hideSidebar = () => {
    setIsVisible(!isVisible);
  };

  const logoutHandler = () => {
    hideSidebar();
    cookies.remove(COOKIENAME.session);
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
                aditionalFunction={
                  navlink.aditionalFunction === "hideSidebar"
                    ? hideSidebar
                    : logoutHandler
                }
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
