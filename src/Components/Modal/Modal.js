import React, { useContext } from "react";
import StatesContext from "../../Contexts/StatesContext";
import Button from "../Button/Button";

import "./Modal.css";
import icons from "../../Assets/Icons";

const Modal = ({ modalTitle, children }) => {
  const { showModal, setShowModal, setShowExpiration } =
    useContext(StatesContext);

  const closeModalHandler = () => {
    setShowModal(!showModal);
    setShowExpiration(null);
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
