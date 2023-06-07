import { useContext } from "react";

import { UserContext } from "Contexts";
import { AccountCircleSharpIcon } from "Assets/Icons";

import "./Message.css";

const Message = ({ avatar, message, date, author }) => {
  const { userData } = useContext(UserContext);
  return (
    <div className={author === userData.fullName ? "message me" : "message"}>
      <div
        className={
          author === userData.fullName
            ? "message-content me"
            : "message-content"
        }
      >
        <div className="user-img-chat">
          {avatar ? (
            <div className="chat-img-avatar">
              <img src={avatar} alt="user avatar" />
            </div>
          ) : (
            <AccountCircleSharpIcon />
          )}
        </div>
        <div className="bubble-container">
          <span className="user-name">{author}</span>
          <div className="message-info">
            <div className="message-text">{message}</div>
            <div
              className={
                author === userData.fullName
                  ? "message-arrow me"
                  : "message-arrow"
              }
            ></div>
          </div>
        </div>
      </div>
      <div className="message-date">{date}</div>
    </div>
  );
};

export default Message;
