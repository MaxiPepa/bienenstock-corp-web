import { useContext } from "react";
import { StatesContext } from "Contexts";

import "./ConfirmationForm.css";

const ConfirmationForm = ({
  functionFather,
  setModalConfirm,
  setCompleteInputValue,
}) => {
  const { setShowModal } = useContext(StatesContext);

  const handleConfirmation = () => functionFather();

  const closeModalHandler = () => {
    setShowModal(false);
    setModalConfirm?.(false);
    setCompleteInputValue?.(false);
  };

  return (
    <>
      <div className="confirmation-container">
        <h3 className="area-subtitle">
          Would you like to confirm the operation?
        </h3>
        <div className="buttons-confirmation-container">
          <button
            type="button"
            onClick={() => handleConfirmation(true)}
            className="table-button-style confirm-style"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={closeModalHandler}
            className="table-button-style cancel-style"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmationForm;
