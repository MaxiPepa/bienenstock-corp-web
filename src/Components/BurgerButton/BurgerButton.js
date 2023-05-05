import React from "react";
import { useState, useEffect } from "react";

import "./BurgerButton.css";

import icons from "../../Assets/Icons";

const Burgerbutton = ({ isVisible, setIsVisible }) => {
  const [menuIcon, setMenuIcon] = useState(<icons.MenuRoundedIcon />);

  useEffect(() => {
    if (isVisible === true) {
      setMenuIcon(<icons.MenuOpenRoundedIcon />);
    } else {
      setMenuIcon(<icons.MenuRoundedIcon />);
    }
  }, [isVisible]);

  const openMenu = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <button
        className={isVisible ? "sidebar-toggle" : "close sidebar-toggle"}
        onClick={openMenu}
      >
        {menuIcon}
      </button>
    </>
  );
};

export default Burgerbutton;
