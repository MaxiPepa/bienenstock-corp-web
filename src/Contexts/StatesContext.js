import { useState, createContext } from "react";

const StatesContext = createContext();

const StatesProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <StatesContext.Provider
      value={{
        isVisible,
        setIsVisible,
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
