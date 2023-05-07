import React from "react";
import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import UserContext from "../Contexts/UserContext";
import { USER } from "../Assets/Constants";

const Layout = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);

  useEffect(() => {
    // reemplazar !USER.bool por !userData.token
    if (!USER.bool) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
