import { Outlet } from "react-router-dom";

import { Alert, Loader } from "Components";

const Layout = () => {
  return (
    <>
      <Outlet />
      <Alert />
      <Loader />
    </>
  );
};

export default Layout;
