import { useContext, useState, useEffect, useCallback } from "react";
import * as Reader from "Assets/Reader";

import { parsingDate } from "Assets/Parsing";

import { Button, ChatComponent } from "Components";
import { APIContext, UserContext } from "Contexts";
import { QuestionAnswerIcon } from "Assets/Icons";

import "./ChatContainer.css";

const ChatContainer = () => {
  const { get } = useContext(APIContext);
  const { userData } = useContext(UserContext);

  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState(null);

  const [countMessages, setCountMessages] = useState(0);
  const [lastCount, setLastCount] = useState(messages.length);

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

  useEffect(() => {
    getMessages();
    setConnection(Reader.listen(getMessages, "chat", "chatHub", "ChatUpdate"));
  }, [getMessages]);

  useEffect(() => {
    return () => {
      Reader.stop(connection);
    };
  }, [connection]);

  // useEffect(() => {
  //   const lastUserMessageIndex = messages.findLastIndex(
  //     (message) => message.fullName === userData.fullName
  //   );
  //   console.log(lastUserMessageIndex);

  //   if (lastUserMessageIndex !== messages.length - 1) {
  //     const messagesAfterLastUserMessage =
  //       messages.length - lastUserMessageIndex - 1;
  //     setCountMessages(messagesAfterLastUserMessage);
  //   }

  //   if (showChat) {
  //     setCountMessages(0);
  //     setLastCount(messages.length);
  //   }

  //   if (
  //     !showChat &&
  //     messages.length > lastCount &&
  //     messages[messages.length - 1].fullName !== userData.fullName
  //   ) {
  //     setCountMessages(messages.length - lastCount);
  //   }
  // }, [lastCount, messages, showChat, userData.fullName]);

  return (
    <>
      {showChat && <ChatComponent messages={messages} />}
      <div className="chat-button-container">
        {!showChat && countMessages >= 0 && (
          <div className="unread-messages-counter">{countMessages}</div>
        )}
        <Button
          styles="chat-button"
          buttonFunction={handleChatButtonClick}
          buttonIcon={<QuestionAnswerIcon />}
        />
      </div>
    </>
  );
};

export default ChatContainer;
