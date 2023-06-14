import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import { NAVIGATIONSLINKS } from "Assets/Constants";

import { NavLink, UserCard } from "Components";
import {
  StatesContext,
  UserContext,
  APIContext,
  ReaderContext,
} from "Contexts";
import {
  DashboardIcon,
  BackupTableRoundedIcon,
  BuildRoundedIcon,
  ExitToAppIcon,
} from "Assets/Icons";

import "./Sidebar.css";

const Sidebar = () => {
  const { userData } = useContext(UserContext);
  const { showSideBar, setShowSideBar } = useContext(StatesContext);
  const { get } = useContext(APIContext);
  const { stopAllConnections } = useContext(ReaderContext);

  const navigate = useNavigate();

  const hideSidebar = () => {
    setShowSideBar(!showSideBar);
  };

  const cookies = new Cookies();

  const logoutHandler = () => {
    get("authentication/logout")
      .then(() => {
        cookies.remove("user_role", {
          path: "/",
        });
      })
      .finally(() => {
        navigate("/login");
        hideSidebar();
        stopAllConnections();
      });
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
            navigation={"/products"}
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
          <li>
            <button onClick={logoutHandler} className="navlink">
              <ExitToAppIcon />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
