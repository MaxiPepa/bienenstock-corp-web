import React from "react";
import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import UserContext from "../Contexts/UserContext";

const Layout = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (!userData.token) {
      navigate("/dashboard");
    } else {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
