import { useState, createContext } from "react";
import { USER } from "../Assets/Constants";

const StatesContext = createContext();

const StatesProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLogged, setIsLogged] = useState(USER.bool);
  const [showModal, setShowModal] = useState(false);

  return (
    <StatesContext.Provider
      value={{
        isVisible,
        setIsVisible,
        isLogged,
        setIsLogged,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </StatesContext.Provider>
  );
};

export { StatesProvider };
export default StatesContext;
