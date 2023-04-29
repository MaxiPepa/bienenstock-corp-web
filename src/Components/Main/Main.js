import React from "react";
import "./Main.css";
import Header from "../Header/Header";

const Main = ({ isVisible, setIsVisible }) => {
  return (
    <main>
      <Header isVisible={isVisible} setIsVisible={setIsVisible} />
      <div className="main-content">
        <h1>Dashboard</h1>
      </div>
    </main>
  );
};

export default Main;
