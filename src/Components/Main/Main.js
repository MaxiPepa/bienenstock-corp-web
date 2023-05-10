import React, { useContext } from "react";
import StatesContext from "../../Contexts/StatesContext";

import "./Main.css";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const Main = ({ render }) => {
  const { showSideBar, setShowSideBar } = useContext(StatesContext);
  return (
    <main>
      <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <div className="main-content">{render}</div>
    </main>
  );
};

export default Main;
