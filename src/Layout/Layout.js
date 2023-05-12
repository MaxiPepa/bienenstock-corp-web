import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import APIContext from "../Contexts/APIContext";

const Layout = () => {
  const navigate = useNavigate();
  const { getToken } = useContext(APIContext);

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    }
  }, [navigate, getToken]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
