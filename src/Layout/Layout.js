import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Alert, Loader } from "Components";
import { APIContext } from "Contexts";

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
      <Alert />
      <Loader />
    </>
  );
};

export default Layout;
