import { useState, createContext } from "react";

const StatesContext = createContext();

const StatesProvider = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  return (
    <StatesContext.Provider
      value={{
        showSideBar,
        setShowSideBar,
        showModal,
        setShowModal,
        showLoader,
        setShowLoader,
      }}
    >
      {children}
    </StatesContext.Provider>
  );
};

export { StatesProvider };
export default StatesContext;
