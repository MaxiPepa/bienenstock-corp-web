import React from "react";

import "./Input.css";

const Input = ({
  labelName,
  styles,
  type,
  placeholder,
  value,
  inputFunction,
  step,
  min,
  max,
}) => {
  return (
    <div className="input-content">
      <label>{labelName}</label>
      <input
        className={styles}
        type={type}
        placeholder={placeholder}
        value={value}
        step={step ? step : null}
        min={min ? min : null}
        max={max ? max : null}
        onChange={(e) => inputFunction(e.target.value)}
      />
    </div>
  );
};

export default Input;
