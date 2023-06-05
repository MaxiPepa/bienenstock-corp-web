import { useContext } from "react";

import { UserContext } from "Contexts";
import { AccountCircleSharpIcon } from "Assets/Icons";

import "./Message.css";

const Message = ({ avatar, message, date, author }) => {
  const { userData } = useContext(UserContext);
  return (
    <div className={author === userData.fullName ? "message me" : "message"}>
      <div className="user-img-chat">
        {avatar ? (
          <div className="chat-img-avatar">
            <img src={avatar} alt="user avatar" />
          </div>
        ) : (
          <AccountCircleSharpIcon />
        )}
        <span>{author}</span>
      </div>
      <div className="message-info">
        <div className="message-text">{message}</div>
      </div>
      <div className="message-date">{date}</div>
    </div>
  );
};

export default Message;
