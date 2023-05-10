import { useContext } from "react";

import StatesContext from "../../Contexts/StatesContext";

import "./Loader.css";

const Loader = () => {
  const { showLoader } = useContext(StatesContext);
  return (
    showLoader && (
      <div className="loader-container">
        <div class="loader"></div>
      </div>
    )
  );
};

export default Loader;
