import { Sidebar, Header } from "../../Assets/Components";

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
