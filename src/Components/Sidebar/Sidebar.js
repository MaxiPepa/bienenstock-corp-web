import React from "react";
import { Link } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = ({ isVisible }) => {
  return (
    <div className={isVisible ? "sidebar open" : "sidebar"}>
      <nav>
        <ul>
          <li>
            <Link to="/dashboar">Dashboard</Link>
          </li>
          <li>
            <Link to="/dashboar">Users</Link>
          </li>
          <li>
            <Link to="/dashboar">Products</Link>
          </li>
          <li>
            <Link to="/dashboar">Orders</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
