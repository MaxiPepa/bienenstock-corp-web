import React, { useContext } from "react";
import StatesContext from "../../Contexts/StatesContext";

import "./Main.css";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const Main = ({ render }) => {
  const { isVisible, setIsVisible } = useContext(StatesContext);
  return (
    <main>
      <Header isVisible={isVisible} setIsVisible={setIsVisible} />
      <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} />
      <div className="main-content">{render}</div>
    </main>
  );
};

export default Main;
