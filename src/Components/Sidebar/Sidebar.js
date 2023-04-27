import React from "react";
import { useState, useEffect } from "react";

import "./Sidebar.css";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import Burgerbutton from "../BurgerButton/BurgerButton";

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuIcon, setMenuIcon] = useState(<MenuRoundedIcon />);

  useEffect(() => {
    if (isVisible === true) {
      setMenuIcon(<MenuOpenRoundedIcon />);
    } else {
      setMenuIcon(<MenuRoundedIcon />);
    }
  }, [isVisible]);

  const openMenu = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className={isVisible ? "sidebar open" : "sidebar"}>
      <Burgerbutton
        menuIcon={menuIcon}
        openMenu={openMenu}
        isVisible={isVisible}
      />
      <h1>Bienenstock Corp.</h1>
      <nav>
        <ul></ul>
      </nav>
    </div>
  );
};

export default Sidebar;
