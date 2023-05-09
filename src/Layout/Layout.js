import React from "react";
import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import APIContext from "../Contexts/APIContext";
import UserContext from "../Contexts/UserContext";

const Layout = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const { getToken } = useContext(APIContext);

  useEffect(() => {
    if (!getToken()) {
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
