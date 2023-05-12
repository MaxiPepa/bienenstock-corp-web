import { useNavigate } from "react-router-dom";
import { ROLES } from "../../Assets/Constants";
import { useEffect } from "react";

const useRedirect = (currentRole, requiredRole) => {
  const navigate = useNavigate();
  const currentURL = window.location.pathname;

  useEffect(() => {
    if (currentRole === null) {
      navigate(currentURL);
    } else if (currentRole !== requiredRole && currentRole !== ROLES.ADMIN) {
      navigate("/dashboard");
    } else {
      currentURL === "/" || currentURL === "/login"
        ? navigate("/dashboard")
        : navigate(currentURL);
    }
  }, [currentRole, requiredRole, navigate, currentURL]);

  return;
};

export default useRedirect;
