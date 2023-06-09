import { useContext } from "react";
import { StatesContext } from "Contexts";

import "./ConfirmationForm.css";

const ConfirmationForm = ({
  onConfirm,
  setModalConfirm,
  setCompleteInputValue,
  actionText,
}) => {
  const { setShowModal } = useContext(StatesContext);

  const confirmationHandler = () => {
    onConfirm();
    setShowModal(false);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setModalConfirm?.(false);
    setCompleteInputValue?.(false);
  };

  return (
    <>
      <div className="confirmation-container">
        <h3 className="area-subtitle">
          Are you sure you want to {actionText}?
        </h3>
        <div className="buttons-confirmation-container">
          <button
            type="button"
            onClick={confirmationHandler}
            className="table-button-style accept-button"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={closeModalHandler}
            className="table-button-style cancel-button"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmationForm;
