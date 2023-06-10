import { Sidebar, Header, ChatContainer } from "Components";

import "./Main.css";

const Main = ({ render }) => {
  return (
    <main>
      <Header />
      <Sidebar />
      <div className="main-content">{render}</div>
      <ChatContainer />
    </main>
  );
};

export default Main;
