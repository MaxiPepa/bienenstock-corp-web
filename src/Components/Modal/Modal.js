import { useContext } from "react";

import { Button } from "../../Assets/Components";
import { StatesContext } from "../../Assets/Contexts";
import { CloseRoundedIcon } from "../../Assets/Icons";

import "./Modal.css";
import "../Input/Input.css";

const Modal = ({
  modalTitle,
  setShowCartModal,
  setShowInputsModal,
  setExpiration,
  setCartData,
  children,
}) => {
  const { showModal, setShowModal } = useContext(StatesContext);

  const closeModalHandler = () => {
    setShowModal(false);
    setShowCartModal?.(false);
    setShowInputsModal?.(false);
    setExpiration?.([]);
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
