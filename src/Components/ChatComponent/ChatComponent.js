import { useContext, useRef } from "react";
import { useForm, Controller } from "react-hook-form";

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
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const textareaRef = useRef();

  const onSubmit = (data) => {
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

  const handleInput = (event) => {
    if (event.key === "Enter") {
      const maxHeight = 100;
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = newHeight + "px";
    }
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
      </div>
      <form className="chat-input" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: true, maxLength: 240 }}
          render={({ field }) => (
            <textarea
              {...field}
              ref={(el) => {
                field.ref(el);
                textareaRef.current = el;
              }}
              type="text"
              placeholder="Type your message here..."
              maxLength={240}
              onKeyPress={(event) => {
                handleInput(event);
              }}
            />
          )}
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
