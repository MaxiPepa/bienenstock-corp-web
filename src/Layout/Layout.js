import React from "react";
import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import StatesContext from "../Contexts/StatesContext";

const Layout = () => {
  const navigate = useNavigate();
  const { isLogged } = useContext(StatesContext);

  useEffect(() => {
    if (isLogged === false) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
