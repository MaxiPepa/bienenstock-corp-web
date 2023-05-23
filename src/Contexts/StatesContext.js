import { useState, createContext, useEffect } from "react";

const StatesContext = createContext();

const StatesProvider = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: null,
    message: null,
  });

  useEffect(() => {
    if (alert.show) {
      setTimeout(() => {
        setAlert({
          show: false,
          type: null,
          message: null,
        });
      }, 3000);
    }
  }, [alert.show]);

  return (
    <StatesContext.Provider
      value={{
        showSideBar,
        setShowSideBar,
        showModal,
        setShowModal,
        showLoader,
        setShowLoader,
        alert,
        setAlert,
      }}
    >
      {children}
    </StatesContext.Provider>
  );
};

export { StatesProvider };
export default StatesContext;
