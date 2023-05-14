import { useContext } from "react";
import Cookies from "universal-cookie";

import NavLink from "../NavLink/NavLink";
import UserCard from "../UserCard/UserCard";
import UserContext from "../../Contexts/UserContext";

import { NAVLINKS, COOKIENAME } from "../../Assets/Constants";
import icons from "../../Assets/Icons";

import "./Sidebar.css";

const Sidebar = ({ showSideBar, setShowSideBar }) => {
  const cookies = new Cookies();
  const { userData } = useContext(UserContext);

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
            icon={<icons.DashboardIcon />}
            navItemName={"Dashboard"}
          />
          <NavLink
            navigation={"/dashboard/poducts"}
            aditionalFunction={hideSidebar}
            icon={<icons.BackupTableRoundedIcon />}
            navItemName={"Products"}
          />
          {NAVLINKS.map((navlink, index) => {
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
            icon={<icons.BuildRoundedIcon />}
            navItemName={"Settings"}
          />
          <NavLink
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
