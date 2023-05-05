import React from "react";
import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import UserContext from "../Contexts/UserContext";
import { USER } from "../Assets/Constants";

const Layout = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const currentURL = window.location.pathname;

  useEffect(() => {
    // reemplazar !USER.bool por !userData.token
    if (!USER.bool) {
      navigate("/login");
    } else {
      currentURL === "/" || currentURL === "/login"
        ? navigate("/dashboard")
        : navigate(currentURL);
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
