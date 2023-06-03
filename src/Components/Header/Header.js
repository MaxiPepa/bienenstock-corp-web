import React from "react";

import { BurgerButton } from "Components";

import "./Header.css";

const Header = () => {
  return (
    <header>
      <BurgerButton />
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
