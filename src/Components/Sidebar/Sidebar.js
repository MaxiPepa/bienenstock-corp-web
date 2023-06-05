import { useContext } from "react";
import Cookies from "universal-cookie";

import { NAVIGATIONSLINKS, COOKIENAME } from "Assets/Constants";

import { NavLink, UserCard } from "Components";
import { StatesContext, UserContext } from "Contexts";
import {
  DashboardIcon,
  BackupTableRoundedIcon,
  BuildRoundedIcon,
  ExitToAppIcon,
} from "Assets/Icons";

import "./Sidebar.css";

const Sidebar = () => {
  const cookies = new Cookies();
  const { userData } = useContext(UserContext);
  const { showSideBar, setShowSideBar } = useContext(StatesContext);

  const hideSidebar = () => {
    setShowSideBar(!showSideBar);
  };

  const logoutHandler = () => {
    cookies.remove(COOKIENAME.session, {
      path: "/",
    });
    hideSidebar();
  };

  return (
    <div className={showSideBar ? "sidebar open" : "sidebar"}>
      <UserCard />
      <nav>
        <ul>
          <NavLink
            navigation={"/dashboard"}
            aditionalFunction={hideSidebar}
            icon={<DashboardIcon />}
            navItemName={"Dashboard"}
          />
          <NavLink
            navigation={"/dashboard/products"}
            aditionalFunction={hideSidebar}
            icon={<BackupTableRoundedIcon />}
            navItemName={"Products"}
          />
          {NAVIGATIONSLINKS.map((navlink, index) => {
            return navlink.roles.includes(userData.userType) ? (
              <NavLink
                key={index}
                navigation={navlink.navigation}
                aditionalFunction={hideSidebar}
                icon={navlink.icon}
                navItemName={navlink.navItemName}
              />
            ) : null;
          })}
          <NavLink
            navigation={"/settings"}
            aditionalFunction={hideSidebar}
            icon={<BuildRoundedIcon />}
            navItemName={"Settings"}
          />
          <NavLink
            navigation={"/login"}
            aditionalFunction={logoutHandler}
            icon={<ExitToAppIcon />}
            navItemName={"Logout"}
          />
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
