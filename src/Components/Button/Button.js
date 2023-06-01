import React from "react";

import "./Button.css";

const Button = ({ styles, type, buttonFunction, buttonIcon, buttonText }) => {
  return (
    <>
      <button
        className={styles}
        type={type ? type : "button"}
        onClick={buttonFunction ? buttonFunction : null}
      >
        {buttonIcon ? buttonIcon : null}

        {buttonText ? <span>{buttonText}</span> : null}
      </button>
    </>
  );
};

export default Button;
