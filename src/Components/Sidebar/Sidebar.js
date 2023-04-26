import React from "react";
import { useState } from "react";

import "./Sidebar.css";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import Burgerbutton from "../BurgerButton/BurgerButton";

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuIcon, setMenuIcon] = useState(<MenuRoundedIcon />);
  const openMenu = () => {
    setIsVisible(!isVisible);
    if (isVisible === true) {
      setMenuIcon(<MenuOpenRoundedIcon />);
    } else {
      setMenuIcon(<MenuRoundedIcon />);
    }
  };
  return (
    <div className={isVisible ? "sidebar open" : "sidebar"}>
      <Burgerbutton
        menuIcon={menuIcon}
        openMenu={openMenu}
        isVisible={isVisible}
      />
      <h1>Sidebar</h1>
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Portfolio</li>
          <li>Contact</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
