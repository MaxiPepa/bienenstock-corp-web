import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { USER } from "../Assets/Constants";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (USER.bool === false) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
