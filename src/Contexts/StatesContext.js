import { useState, createContext } from "react";

const StatesContext = createContext();

const StatesProvider = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showExpiration, setShowExpiration] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [cartData, setCartData] = useState([]);

  const functionAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const functionModal = () => {
    setShowModal(!showModal);
  };

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
        showAlert,
        setShowAlert,
        functionAlert,
        functionModal,
        cartData,
        setCartData,
      }}
    >
      {children}
    </StatesContext.Provider>
  );
};

export { StatesProvider };
export default StatesContext;
