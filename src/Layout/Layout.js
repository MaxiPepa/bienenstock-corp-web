import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import components from "../Assets/Components";
import contexts from "../Assets/Contexts";

const Layout = () => {
  const navigate = useNavigate();
  const { getToken } = useContext(contexts.APIContext);

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    }
  }, [navigate, getToken]);

  return (
    <>
      <Outlet />
      <components.Alert />
      <components.Loader />
    </>
  );
};

export default Layout;
