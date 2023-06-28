import { useNavigate } from "react-router-dom";

import { BurgerButton } from "Components";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <BurgerButton />
      <p onClick={() => navigate("/dashboard")}>
        Bienen<span>stock</span> Corp.
      </p>
    </header>
  );
};

export default Header;
