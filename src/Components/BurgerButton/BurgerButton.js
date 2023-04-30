import React from "react";
import { useState, useEffect } from "react";

import "./BurgerButton.css";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";

const Burgerbutton = ({ isVisible, setIsVisible }) => {
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
