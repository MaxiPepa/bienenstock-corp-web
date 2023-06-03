import { useState } from "react";

import "./ExpirationInput.css";

const ExpirationInput = ({ register, expirationKey, resetField }) => {
  const [state, setState] = useState(false);

  return (
    <div className="expiration-input-container">
      <label className="cl-checkbox">
        <input
          type="checkbox"
          className="expiration-checkbox"
          checked={state}
          onChange={(e) => {
            setState(e.target.checked);
            if (!e.target.checked) {
              resetField(expirationKey);
            }
          }}
        />
        <span></span>
      </label>

      {state && (
        <>
          <input className="input" type="date" {...register(expirationKey)} />
        </>
      )}
    </div>
  );
};

export default ExpirationInput;
