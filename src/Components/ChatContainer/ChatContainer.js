import { useContext, useState, useEffect, useCallback, useRef } from "react";
import * as Reader from "Assets/Reader";
import Cookies from "universal-cookie";

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

  const bottomRef = useRef(null);
  const messageRefs = useRef([]);

  const setMessageRef = (el, index) => {
    messageRefs.current[index] = el;
  };

  const lastMessageView = useRef(
    new Cookies().get(`chat_user_${userData.userId}`)
  );

  const scrollToLastReadMessage = useCallback((messageRef) => {
    if (messageRef) {
      messageRef.scrollIntoView({
        behavior: "auto",
      });
    }
  }, []);

  const handleChatButtonClick = () => {
    setShowChat(!showChat);
    if (!showChat) {
      scrollToLastReadMessage();
    }
  };

  const setCookieChatHandler = useCallback(
    (messagesQuantity) => {
      if (userData.userId) {
        new Cookies().set(`chat_user_${userData.userId}`, messagesQuantity, {
          path: "/",
        });
        lastMessageView.current = messagesQuantity;
      }
    },
    [userData.userId]
  );

  const getMessages = useCallback(() => {
    get("message/getMessages", {}, false).then((data) => {
      setMessages(
        data.messages.map((message) => ({
          messageId: message.messageId,
          description: message.description.replace(/\n/g, "\n"),
          date: parsingDate(message.date),
          fullName: message.fullName,
          avatar: message.avatar,
        }))
      );

      if (lastMessageView.current === undefined) {
        setCookieChatHandler(data.messages.length);
      }
    });
  }, [get, setCookieChatHandler]);

  useEffect(() => {
    getMessages();
    setConnection(Reader.listen(getMessages, "chat", "chatHub", "ChatUpdate"));
  }, [getMessages]);

  useEffect(() => {
    return () => {
      Reader.stop(connection);
    };
  }, [connection]);

  useEffect(() => {
    if (showChat) {
      const messageRef = messageRefs.current[lastMessageView.current - 1];
      if (lastMessageView.current > 0) {
        scrollToLastReadMessage(messageRef);
      }
      setCookieChatHandler(messages.length);
    }
  }, [
    messages,
    scrollToLastReadMessage,
    setCookieChatHandler,
    showChat,
    userData.fullName,
  ]);

  return (
    <>
      {showChat && (
        <ChatComponent
          messages={messages}
          setMessageRef={setMessageRef}
          ref={bottomRef}
        />
      )}
      <div className="chat-button-container">
        {!showChat &&
          messages.length !== lastMessageView.current &&
          messages.length - lastMessageView.current > 0 && (
            <div className="unread-messages-counter">
              <span>{messages.length - lastMessageView.current}</span>
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
