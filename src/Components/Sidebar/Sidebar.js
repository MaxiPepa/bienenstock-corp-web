import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import StatesContext from "../../Contexts/StatesContext";

import "./Sidebar.css";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BackupTableRoundedIcon from "@mui/icons-material/BackupTableRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Sidebar = ({ isVisible, setIsVisible }) => {
  const navigate = useNavigate();
  const { setIsLogged } = useContext(StatesContext);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleLogOut = () => {
    handleClick();
    setIsLogged(false);
    navigate("/login");
  };
  return (
    <div className={isVisible ? "sidebar open" : "sidebar"}>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard" onClick={handleClick}>
              <DashboardIcon className="sidebar-icon" />
              <span className="sidebar-link-name">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/products" onClick={handleClick}>
              <BackupTableRoundedIcon className="sidebar-icon" />
              <span className="sidebar-link-name">Products</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/purchansing-area" onClick={handleClick}>
              <ShoppingCartRoundedIcon className="sidebar-icon" />
              <span className="sidebar-link-name">Purchansing</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/sales-area" onClick={handleClick}>
              <ReceiptRoundedIcon className="sidebar-icon" />
              <span className="sidebar-link-name">Sales</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/storage-area" onClick={handleClick}>
              <ArchiveRoundedIcon className="sidebar-icon" />
              <span className="sidebar-link-name">Storage</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/reports-area" onClick={handleClick}>
              <LeaderboardRoundedIcon className="sidebar-icon" />
              <span className="sidebar-link-name">Reports</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={handleClick}>
              <BuildRoundedIcon className="sidebar-icon" />
              <span className="sidebar-link-name">Settings</span>
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={handleLogOut}>
              <ExitToAppIcon className="sidebar-icon" />
              <span className="sidebar-link-name">Log Out</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
