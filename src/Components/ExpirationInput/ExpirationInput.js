import { useState } from "react";

const ExpirationInput = ({ register, expirationKey, resetField }) => {
  const [state, setState] = useState(false);

  return (
    <>
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
      {state && (
        <>
          <input className="input" type="date" {...register(expirationKey)} />
        </>
      )}
    </>
  );
};

export default ExpirationInput;
