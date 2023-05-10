import React from "react";

import "./Header.css";
import Burgerbutton from "../BurgerButton/BurgerButton";

const Header = ({ showSideBar, setShowSideBar }) => {
  return (
    <header>
      <Burgerbutton showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
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
