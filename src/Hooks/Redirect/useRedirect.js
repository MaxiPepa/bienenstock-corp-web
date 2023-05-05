import { useNavigate } from "react-router-dom";
import { ROLES } from "../../Assets/Constants";
import { useEffect } from "react";

const useRedirect = (currentRole, requiredRole) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (currentRole !== requiredRole && currentRole !== ROLES.ADMIN) {
      navigate("/dashboard");
    }
  }, [currentRole, requiredRole, navigate]);

  return;
};

export default useRedirect;
