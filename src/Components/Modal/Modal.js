import { useContext } from "react";

import { Button } from "Components";
import { StatesContext } from "Contexts";
import { CloseRoundedIcon } from "Assets/Icons";

import "./Modal.css";
import "../Input/Input.css";

const Modal = ({
  modalTitle,
  setShowCartModal,
  setShowInputsModal,
  setExpiration,
  setCartData,
  setModalConfirm,
  setCompleteInputValue,
  children,
}) => {
  const { showModal, setShowModal } = useContext(StatesContext);

  const closeModalHandler = () => {
    setShowModal(false);
    setShowCartModal?.(false);
    setShowInputsModal?.(false);
    setExpiration?.([]);
    setCartData?.([]);
    setModalConfirm?.(false);
    setCompleteInputValue?.(false);
  };

  return (
    <>
      {showModal ? (
        <div className="modal">
          <div className="modal-content">
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
