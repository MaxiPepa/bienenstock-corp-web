import { useContext } from "react";

import "./Modal.css";
import "../Input/Input.css";
import icons from "../../Assets/Icons";
import components from "../../Assets/Components";
import contexts from "../../Assets/Contexts";

const Modal = ({
  modalTitle,
  setShowCartModal,
  setShowInputsModal,
  setCartData,
  children,
}) => {
  const { showModal, setShowModal } = useContext(contexts.StatesContext);

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
              <components.Button
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
