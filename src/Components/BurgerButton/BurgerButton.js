import { useContext } from "react";
import StatesContext from "../../Contexts/StatesContext";

import "./BurgerButton.css";
import icons from "../../Assets/Icons";

const Burgerbutton = () => {
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
        {showSideBar ? (
          <icons.MenuOpenRoundedIcon />
        ) : (
          <icons.MenuRoundedIcon />
        )}
      </button>
    </>
  );
};

export default Burgerbutton;
