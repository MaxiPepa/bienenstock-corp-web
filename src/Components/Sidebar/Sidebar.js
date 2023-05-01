import React from "react";
import NavLink from "../NavLink/NavLink";

import "./Sidebar.css";

import { NAVLINKS } from "../../Assets/Constants";
import { USER } from "../../Assets/Constants";

const Sidebar = ({ isVisible, setIsVisible }) => {
  const hideSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={isVisible ? "sidebar open" : "sidebar"}>
      <nav>
        <ul>
          {NAVLINKS.map((navlink) => {
            return navlink.roles === "All" || navlink.roles === USER.role ? (
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
