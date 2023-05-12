import { useState, createContext } from "react";

const StatesContext = createContext();

const StatesProvider = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showExpiration, setShowExpiration] = useState(null);

  return (
    <StatesContext.Provider
      value={{
        showSideBar,
        setShowSideBar,
        showModal,
        setShowModal,
        showLoader,
        setShowLoader,
        showExpiration,
        setShowExpiration,
      }}
    >
      {children}
    </StatesContext.Provider>
  );
};

export { StatesProvider };
export default StatesContext;
