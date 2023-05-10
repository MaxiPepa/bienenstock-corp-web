import React from "react";

const Button = ({ styles, type, buttonFunction, buttonIcon, buttonText }) => {
  return (
    <>
      <button
        className={styles}
        type={type ? type : "button"}
        onClick={buttonFunction}
      >
        {buttonIcon ? buttonIcon : null}

        {buttonText ? <span>{buttonText}</span> : null}
      </button>
    </>
  );
};

export default Button;
