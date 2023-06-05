import { useState } from "react";
import { Sidebar, Header, Button, ChatComponent } from "Components";
import { QuestionAnswerIcon } from "Assets/Icons";

import "./Main.css";

const Main = ({ render }) => {
  const [showChat, setShowChat] = useState(false);

  const handleChatButtonClick = () => {
    setShowChat(!showChat);
  };
  return (
    <main>
      <Header />
      <Sidebar />
      <div className="main-content">{render}</div>
      {showChat && <ChatComponent />}
      <Button
        styles="chat-button"
        buttonFunction={handleChatButtonClick}
        buttonIcon={<QuestionAnswerIcon />}
      />
    </main>
  );
};

export default Main;
