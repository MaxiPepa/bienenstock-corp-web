import { useContext } from "react";

import { Button } from "Components";
import { StatesContext } from "Contexts";
import { CloseRoundedIcon } from "Assets/Icons";

import "./Modal.css";
import "../Input/Input.css";

const Modal = ({
  modalTitle,
  modalId,
  setShowCartModal,
  setShowInputsModal,
  setShowPdfModal,
  setExpiration,
  setCartData,
  setUserModal,
  setCompleteInputValue,
  setEntryModal,
  setDispatchModal,
  reset,
  children,
}) => {
  const { showModal, setShowModal } = useContext(StatesContext);

  const closeModalHandler = () => {
    setShowModal(false);
    setShowCartModal?.(false);
    setShowInputsModal?.(false);
    setExpiration?.([]);
    setCartData?.([]);
    setUserModal?.(false);
    setCompleteInputValue?.(false);
    setEntryModal?.(false);
    setDispatchModal?.(false);
    setShowPdfModal?.(false);
    reset?.();
  };

  return (
    <>
      {showModal ? (
        <div className="modal">
          <div className="modal-content" id={modalId ? modalId : null}>
            <div className="modal-header">
              <h2>{modalTitle}</h2>
              <Button
                styles="modal-close-button"
                buttonFunction={closeModalHandler}
                buttonIcon={<CloseRoundedIcon />}
              />
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
