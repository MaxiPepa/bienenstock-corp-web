import React from "react";

import "./Input.css";

const Input = ({
  labelName,
  styles,
  type,
  placeholder,
  value,
  inputFunction,
}) => {
  return (
    <div className="input-content">
      <label>{labelName}</label>
      <input
        className={styles}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => inputFunction(e.target.value)}
      />
    </div>
  );
};

export default Input;
