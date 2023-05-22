import React from "react";

import "./Header.css";
import { BurgerButton } from "../../Assets/Components";

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
