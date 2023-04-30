import { useState, createContext } from "react";
import { USER } from "../Assets/Constants";

const StatesContext = createContext();

const StatesProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLogged, setIsLogged] = useState(USER.bool);

  return (
    <StatesContext.Provider
      value={{ isVisible, setIsVisible, isLogged, setIsLogged }}
    >
      {children}
    </StatesContext.Provider>
  );
};

export { StatesProvider };
export default StatesContext;
