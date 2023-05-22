import React from "react";

import "./Header.css";
import components from "../../Assets/Components";

const Header = () => {
  return (
    <header>
      <components.BurgerButton />
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
