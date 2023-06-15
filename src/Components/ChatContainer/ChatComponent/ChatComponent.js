import React, { useContext, useRef } from "react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "Components";
import { APIContext, StatesContext } from "Contexts";
import { SendRoundedIcon } from "Assets/Icons";

import "./ChatComponent.css";
import Message from "./Message/Message";

const ChatComponent = React.forwardRef(({ messages, setMessageRef }, ref) => {
  const { post } = useContext(APIContext);
  const { setAlert } = useContext(StatesContext);

  const { control, handleSubmit, reset } = useForm();
  const textareaRef = useRef();

  const onSubmit = (data) => {
    post("message/saveMessage", data, false).then((res) => {
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

      <div className="messages-container" ref={ref}>
        {messages.map((message, index) => (
          <Message
            key={index}
            ref={(el) => setMessageRef(el, index)}
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
    </div>
  );
});

export default ChatComponent;
