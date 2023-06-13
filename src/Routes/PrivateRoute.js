import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const PrivateRoute = ({ roles }) => {
  const location = useLocation();
  const role = new Cookies().get("user_role");

  return roles.includes(role) ? (
    <Outlet />
  ) : role ? (
    <Navigate to={"/dashboard"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default PrivateRoute;
