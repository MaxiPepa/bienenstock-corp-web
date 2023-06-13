import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import { UserContext } from "Contexts";

const PrivateRoute = ({ roles }) => {
  const { userData } = useContext(UserContext);

  const location = useLocation();

  return roles.includes(userData?.userType) ? (
    <Outlet />
  ) : userData?.userId ? (
    <Navigate to={"/dashboard"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default PrivateRoute;
