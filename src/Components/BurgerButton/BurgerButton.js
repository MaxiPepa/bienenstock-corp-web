import { useContext } from "react";

import "./BurgerButton.css";
import { MenuRoundedIcon, MenuOpenRoundedIcon } from "../../Assets/Icons";
import { StatesContext } from "../../Assets/Contexts";

const BurgerButton = () => {
  const { showSideBar, setShowSideBar } = useContext(StatesContext);

  const openMenu = () => {
    setShowSideBar(!showSideBar);
  };
  return (
    <>
      <button
        className={showSideBar ? "sidebar-toggle" : "close sidebar-toggle"}
        onClick={openMenu}
      >
        {showSideBar ? <MenuOpenRoundedIcon /> : <MenuRoundedIcon />}
      </button>
    </>
  );
};

export default BurgerButton;
