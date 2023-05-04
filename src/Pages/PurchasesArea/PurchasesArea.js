import React, { useContext } from "react";
import useRedirect from "../../Hooks/Redirect/useRedirect";

import {
  USER,
  ROLES,
  THEADPURCHASESHISTORY,
  TBODYPURCHASEHISTORYPROVISIONAL,
} from "../../Assets/Constants";
import StatesContext from "../../Contexts/StatesContext";
import { usePurchaseInputs } from "../../Hooks/InputsLists/usePurchaseInputs";

import Button from "../../Components/Button/Button";
import Modal from "../../Components/Modal/Modal";
import Input from "../../Components/Input/Input";
import Table from "../../Components/Tables/Table";

import icons from "../../Assets/Icons";
import "./PurchasesArea.css";

const PurchansingArea = () => {
  useRedirect(USER.role, ROLES.BUYER);

  const { setShowModal, showModal } = useContext(StatesContext);
  const { arrayPurchaseInputs, buyProductsHandler } = usePurchaseInputs();

  const modalStatusHandler = () => {
    setShowModal(!showModal);
  };

  const filteredData = TBODYPURCHASEHISTORYPROVISIONAL.filter(
    USER.role === ROLES.ADMIN ? () => true : (item) => item.Name === USER.name
  );

  return (
    <div className="purchase-area">
      <h2>PurchasesArea</h2>
      <Button
        styles="purchase-button"
        buttonFunction={modalStatusHandler}
        buttonIcon={<icons.ShoppingCartRoundedIcon />}
        buttonText="Nueva Compra"
      />
      <h3> Historial de compras</h3>
      <Table content={filteredData} thead={THEADPURCHASESHISTORY} />
      <Modal modalTitle="Nueva Compra" enterFunction={buyProductsHandler}>
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
          buttonText="Comprar"
        />
      </Modal>
    </div>
  );
};

export default PurchansingArea;
