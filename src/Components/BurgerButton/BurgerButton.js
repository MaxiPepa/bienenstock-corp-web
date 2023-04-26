import React from "react";
import "./BurgerButton.css";

const Burgerbutton = ({ menuIcon, openMenu, isVisible }) => {
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
