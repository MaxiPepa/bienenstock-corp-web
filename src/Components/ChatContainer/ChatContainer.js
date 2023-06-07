import { useContext, useState, useEffect, useCallback } from "react";
import * as Reader from "Assets/Reader";

import { parsingDate } from "Assets/Parsing";
import tone from "Assets/Tone.mp3";

import { Button, ChatComponent } from "Components";
import { APIContext } from "Contexts";
import { QuestionAnswerIcon } from "Assets/Icons";

import "./ChatContainer.css";

const ChatContainer = () => {
  const { get } = useContext(APIContext);

  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState(null);

  const localLastMessageView = () => {
    const lastMessageView = localStorage.getItem("LASTMESSAGEVIEW");
    if (lastMessageView === null) {
      localStorage.setItem("LASTMESSAGEVIEW", messages.length);
      return messages.length;
    } else {
      return lastMessageView;
    }
  };

  const [lastMessageView, setLastMessageView] = useState(
    localLastMessageView()
  );

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
  }, [getMessages, messages.length]);

  useEffect(() => {
    return () => {
      Reader.stop(connection);
    };
  }, [connection]);

  const playNotificationSound = () => {
    const audio = new Audio(tone);
    audio.play();
  };

  useEffect(() => {
    if (showChat) {
      localStorage.setItem("LASTMESSAGEVIEW", messages.length);
      setLastMessageView(messages.length);
    }
    if (!showChat && messages.length !== lastMessageView) {
      playNotificationSound();
    }
  }, [lastMessageView, messages.length, showChat]);

  return (
    <>
      {showChat && <ChatComponent messages={messages} />}
      <div className="chat-button-container">
        {!showChat &&
          messages.length !== lastMessageView &&
          messages.length - lastMessageView > 0 && (
            <div className="unread-messages-counter">
              <span>{messages.length - lastMessageView}</span>
            </div>
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
