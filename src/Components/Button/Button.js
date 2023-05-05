import React from "react";

const Button = ({ styles, type, buttonFunction, buttonIcon, buttonText }) => {
  return (
    <>
      <button
        className={styles}
        type={type ? type : "button"}
        onClick={buttonFunction}
      >
        {buttonIcon}
        <span>{buttonText}</span>
      </button>
    </>
  );
};

export default Button;
