import { useContext } from "react";
import Cookies from "universal-cookie";

import NavLink from "../NavLink/NavLink";
import UserCard from "../UserCard/UserCard";
import UserContext from "../../Contexts/UserContext";

import { NAVLINKS, ROLES, COOKIENAME } from "../../Assets/Constants";

import "./Sidebar.css";

const Sidebar = ({ showSideBar, setShowSideBar }) => {
  const cookies = new Cookies();
  const { userData } = useContext(UserContext);

  const hideSidebar = () => {
    setShowSideBar(!showSideBar);
  };

  const logoutHandler = () => {
    cookies.remove(COOKIENAME.session);
    hideSidebar();
  };

  return (
    <div className={showSideBar ? "sidebar open" : "sidebar"}>
      <UserCard />
      <nav>
        <ul>
          {NAVLINKS.map((navlink, index) => {
            return navlink.roles === "All" ||
              navlink.roles === userData.userType ||
              userData.userType === ROLES.ADMIN ? (
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
