import components from "../../Assets/Components";

import "./Main.css";

const Main = ({ render }) => {
  return (
    <main>
      <components.Header />
      <components.Sidebar />
      <div className="main-content">{render}</div>
    </main>
  );
};

export default Main;
