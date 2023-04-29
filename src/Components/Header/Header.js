import React from "react";

import "./Header.css";
import Burgerbutton from "../BurgerButton/BurgerButton";

const Header = ({ isVisible, setIsVisible }) => {
  return (
    <header>
      <Burgerbutton isVisible={isVisible} setIsVisible={setIsVisible} />
      <h2>Bienenstock Corp.</h2>
    </header>
  );
};

export default Header;
