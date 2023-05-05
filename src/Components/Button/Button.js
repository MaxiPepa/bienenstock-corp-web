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
        {buttonText}
      </button>
    </>
  );
};

export default Button;
