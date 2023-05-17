import React, { useContext } from "react";
import StatesContext from "../../Contexts/StatesContext";
import Button from "../Button/Button";

import "./Modal.css";
import "../Input/Input.css";
import icons from "../../Assets/Icons";

const Modal = ({
  modalTitle,
  setShowCartModal,
  setShowInputsModal,
  setCartData,
  children,
}) => {
  const { showModal, setShowModal } = useContext(StatesContext);

  const closeModalHandler = () => {
    setShowModal(false);
    setShowCartModal?.(false);
    setShowInputsModal?.(false);
    setCartData?.([]);
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
                buttonIcon={<icons.CloseRoundedIcon />}
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
