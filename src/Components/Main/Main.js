import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

import "./Main.css";

const Main = ({ render }) => {
  return (
    <main>
      <Header />
      <Sidebar />
      <div className="main-content">{render}</div>
    </main>
  );
};

export default Main;
