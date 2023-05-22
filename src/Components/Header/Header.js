import React from "react";

import "./Header.css";
import Burgerbutton from "../BurgerButton/BurgerButton";

const Header = () => {
  return (
    <header>
      <Burgerbutton />
      <a
        href="https://github.com/MaxiPepa/bienenstock-corp-web"
        target="_blanck"
      >
        Bienenstock Corp.
      </a>
    </header>
  );
};

export default Header;
