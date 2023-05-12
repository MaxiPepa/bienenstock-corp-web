import { useContext } from "react";
import useRedirect from "../../Hooks/Redirect/useRedirect";

import {
  ROLES,
  THEADPURCHASESHISTORY,
  TBODYPURCHASEHISTORY,
} from "../../Assets/Constants";
import StatesContext from "../../Contexts/StatesContext";
import UserContext from "../../Contexts/UserContext";
import { usePurchaseInputs } from "../../Hooks/InputsLists/usePurchaseInputs";

import Button from "../../Components/Button/Button";
import Modal from "../../Components/Modal/Modal";
import Input from "../../Components/Input/Input";
import Table from "../../Components/Tables/Table";

import icons from "../../Assets/Icons";
import "./PurchasesArea.css";

const PurchansingArea = () => {
  const { userData } = useContext(UserContext);
  useRedirect(userData.userType, ROLES.BUYER);

  const { setShowModal, showModal } = useContext(StatesContext);
  const { arrayPurchaseInputs, buyProductsHandler } = usePurchaseInputs();

  const modalStatusHandler = () => {
    setShowModal(!showModal);
  };

  const updatedTBODYPURCHASEHISTORY = TBODYPURCHASEHISTORY.map((entry) => ({
    ...entry,
    Status: "Pending",
  }));

  return (
    <div className="purchase-area">
      <h2 className="area-title">Purchases Area</h2>
      {userData.userType === ROLES.BUYER ? (
        <Button
          styles="purchase-button"
          buttonFunction={modalStatusHandler}
          buttonIcon={<icons.ShoppingCartRoundedIcon />}
          buttonText="New Purchase"
        />
      ) : null}
      <h3 className="area-subtitle">Purchases History</h3>
      <Table
        content={updatedTBODYPURCHASEHISTORY}
        thead={THEADPURCHASESHISTORY}
      />
      <Modal modalTitle="New Purchase" enterFunction={buyProductsHandler}>
        {arrayPurchaseInputs.map((input, index) => (
          <Input
            key={index}
            labelName={input.labelName}
            styles={input.styles}
            type={input.type}
            placeholder={input.placeholder}
            value={input.value}
            inputFunction={input.inputFunction}
          />
        ))}
        <Button
          styles="modal-button-add"
          buttonFunction={buyProductsHandler}
          buttonIcon={<icons.ShoppingCartRoundedIcon />}
          buttonText="Add Purchase"
        />
      </Modal>
    </div>
  );
};

export default PurchansingArea;
