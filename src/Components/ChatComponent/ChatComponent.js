import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "Components";
import { APIContext, UserContext, StatesContext } from "Contexts";
import { AccountCircleSharpIcon, SendRoundedIcon } from "Assets/Icons";
import { parsingDate } from "Assets/Parsing";

import "./ChatComponent.css";
import Message from "./Message/Message";

const ChatComponent = () => {
  const { userData } = useContext(UserContext);
  const { get, post } = useContext(APIContext);
  const { setAlert } = useContext(StatesContext);

  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    get("message/getMessages").then((data) => {
      setMessages(data.messages);
    });
  }, [get]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const onSubmit = () => {
    console.log(getValues("description"));
    // post(
    //   "message/saveMessage",
    //   { description: getValues("description") }.then((res) => {
    //     if (!res.success) {
    //       setAlert({
    //         show: true,
    //         type: "error",
    //         message: res.message,
    //       });
    //     }
    //     reset();
    //   })
    // );
  };

  return (
    <div className="chat-component">
      <span className="chat-title">General chat</span>
      <div className="messages-container">
        {messages.map((message, index) => (
          <Message
            key={index}
            avatar={message.avatar}
            message={message.description}
            date={parsingDate(message.date)}
            author={message.fullName}
          />
        ))}
        <Message
          avatar={userData.avatar}
          message={getValues("description")}
          date="05/06/2023 15:52"
          author={userData.fullName}
        />
      </div>
      <form className="chat-input" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          type="text"
          placeholder="Type your message here..."
          maxLength={240}
          {...register("description", { required: true, maxLength: 240 })}
        />
        <Button type={"submit"} buttonIcon={<SendRoundedIcon />} />
      </form>
      {errors.description && (
        <span className="error-input-message" id="error-input-message-chat">
          {errors.description.type === "required"
            ? "This field is required"
            : "The message must be less than 240 characters"}
        </span>
      )}
    </div>
  );
};

export default ChatComponent;
