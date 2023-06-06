import { useContext, useState, useEffect, useCallback } from "react";
import * as Reader from "Assets/Reader";

import { parsingDate } from "Assets/Parsing";

import { Button, ChatComponent } from "Components";
import { APIContext } from "Contexts";
import { QuestionAnswerIcon } from "Assets/Icons";

const ChatContainer = () => {
  const { get } = useContext(APIContext);

  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState(null);

  const handleChatButtonClick = () => {
    setShowChat(!showChat);
  };

  const getMessages = useCallback(() => {
    get("message/getMessages").then((data) => {
      setMessages(
        data.messages.map((message) => ({
          messageId: message.messageId,
          description: message.description.replace(/\n/g, "\n"),
          date: parsingDate(message.date),
          fullName: message.fullName,
          avatar: message.avatar,
        }))
      );
    });
  }, [get]);

  console.log(messages);

  useEffect(() => {
    getMessages();
    setConnection(Reader.listen(getMessages, "chat", "chatHub", "ChatUpdate"));
  }, [getMessages]);

  useEffect(() => {
    return () => {
      Reader.stop(connection);
    };
  }, [connection]);
  return (
    <>
      {showChat && <ChatComponent messages={messages} />}
      <Button
        styles="chat-button"
        buttonFunction={handleChatButtonClick}
        buttonIcon={<QuestionAnswerIcon />}
      />
    </>
  );
};

export default ChatContainer;

/*

```HTML
<CustomMessage 
  maxWidth="350px" 
  position="relative"
  backgroundColor="#dcf8c6"
  padding="10px"
  borderRadius="10px"
  marginBottom="10px"
  user="Juan"
  message="Mensaje de prueba."
/>
```

```JS
function CustomMessage({ 
  maxWidth, 
  position, 
  backgroundColor, 
  padding, 
  borderRadius, 
  marginBottom, 
  user, 
  message 
}) {
  return (
    <div style={{
      maxWidth,
      position,
      backgroundColor,
      padding,
      borderRadius,
      marginBottom
    }}>
      <p style={{ margin: "0 0 5px 0", fontSize:"14px", color:"#444" }}>
        {user}
      </p>
      <p style={{ margin: "0", fontSize:"16px", color:"#000" }}>
        {message}
      </p>
      <div style={{
        position: "absolute",
        right: "-10px",
        bottom: "0",
        width: "0",
        height: "0", 
        borderTop: "20px solid transparent",
        borderLeft: `20px solid ${backgroundColor}`,
        borderBottom: "20px solid transparent"
      }}>
      </div>
    </div>
  );
}
```

*/
