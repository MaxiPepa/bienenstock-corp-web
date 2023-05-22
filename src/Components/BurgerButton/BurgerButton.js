import { useContext } from "react";

import "./BurgerButton.css";
import icons from "../../Assets/Icons";
import contexts from "../../Assets/Contexts";

const BurgerButton = () => {
  const { showSideBar, setShowSideBar } = useContext(contexts.StatesContext);

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

export default BurgerButton;
