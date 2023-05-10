import React from "react";
import { useState, useEffect } from "react";

import "./BurgerButton.css";

import icons from "../../Assets/Icons";

const Burgerbutton = ({ showSideBar, setShowSideBar }) => {
  const [menuIcon, setMenuIcon] = useState(<icons.MenuRoundedIcon />);

  useEffect(() => {
    if (showSideBar === true) {
      setMenuIcon(<icons.MenuOpenRoundedIcon />);
    } else {
      setMenuIcon(<icons.MenuRoundedIcon />);
    }
  }, [showSideBar]);

  const openMenu = () => {
    setShowSideBar(!showSideBar);
  };
  return (
    <>
      <button
        className={showSideBar ? "sidebar-toggle" : "close sidebar-toggle"}
        onClick={openMenu}
      >
        {menuIcon}
      </button>
    </>
  );
};

export default Burgerbutton;
