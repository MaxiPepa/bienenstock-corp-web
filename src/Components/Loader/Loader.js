import { useContext } from "react";

import contexts from "../../Assets/Contexts";

import "./Loader.css";

const Loader = () => {
  const { showLoader } = useContext(contexts.StatesContext);
  return (
    showLoader && (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    )
  );
};

export default Loader;
