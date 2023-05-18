import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import APIContext from "../Contexts/APIContext";
import Alert from "../Components/Alert/Alert";
import Loader from "../Components/Loader/Loader";

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
