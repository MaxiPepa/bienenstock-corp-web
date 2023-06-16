import React from "react";

import { BurgerButton } from "Components";

import "./Header.css";

const Header = () => {
  return (
    <header>
      <BurgerButton />
      <p>
        Bienen<span>stock</span> Corp.
      </p>
    </header>
  );
};

export default Header;
