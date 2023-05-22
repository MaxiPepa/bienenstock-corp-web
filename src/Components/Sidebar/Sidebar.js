import { useContext } from "react";
import Cookies from "universal-cookie";

import contexts from "../../Assets/Contexts";

import { NAVLINKS, COOKIENAME } from "../../Assets/Constants";
import icons from "../../Assets/Icons";
import components from "../../Assets/Components";

import "./Sidebar.css";

const Sidebar = () => {
  const cookies = new Cookies();
  const { userData } = useContext(contexts.UserContext);
  const { showSideBar, setShowSideBar } = useContext(contexts.StatesContext);

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
      <components.UserCard />
      <nav>
        <ul>
          <components.NavLink
            navigation={"/dashboard"}
            aditionalFunction={hideSidebar}
            icon={<icons.DashboardIcon />}
            navItemName={"Dashboard"}
          />
          <components.NavLink
            navigation={"/dashboard/products"}
            aditionalFunction={hideSidebar}
            icon={<icons.BackupTableRoundedIcon />}
            navItemName={"Products"}
          />
          {NAVLINKS.map((navlink, index) => {
            return navlink.roles.includes(userData.userType) ? (
              <components.NavLink
                key={index}
                navigation={navlink.navigation}
                aditionalFunction={hideSidebar}
                icon={navlink.icon}
                navItemName={navlink.navItemName}
              />
            ) : null;
          })}
          <components.NavLink
            navigation={"/settings"}
            aditionalFunction={hideSidebar}
            icon={<icons.BuildRoundedIcon />}
            navItemName={"Settings"}
          />
          <components.NavLink
            navigation={"/login"}
            aditionalFunction={logoutHandler}
            icon={<icons.ExitToAppIcon />}
            navItemName={"Logout"}
          />
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
