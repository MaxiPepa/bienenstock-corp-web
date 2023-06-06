import { useContext } from "react";
import { useForm } from "react-hook-form";

import { Button } from "Components";
import { APIContext, UserContext, StatesContext } from "Contexts";
import { SendRoundedIcon } from "Assets/Icons";

import "./ChatComponent.css";
import Message from "./Message/Message";

const ChatComponent = ({ messages }) => {
  const { userData } = useContext(UserContext);
  const { post } = useContext(APIContext);
  const { setAlert } = useContext(StatesContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    // console.log(getValues("description"));
    post("message/saveMessage", data).then((res) => {
      if (!res.success) {
        setAlert({
          show: true,
          type: "error",
          message: res.message,
        });
      }
      reset();
    });
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
            date={message.date}
            author={message.fullName}
          />
        ))}
        {/* <Message
          avatar={userData.avatar}
          message={getValues("description")}
          date="05/06/2023 15:52"
          author={userData.fullName}
        /> */}
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
