import React, { useContext, useState } from "react";
import useRedirect from "../../Hooks/Redirect/useRedirect";
import {
  USER,
  ROLES,
  THEADPURCHASESHISTORY,
  TBODYPURCHASEHISTORY,
} from "../../Assets/Constants";
import StatesContext from "../../Contexts/StatesContext";

import Table from "../../Components/Tables/Table";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";

import "./StorageArea.css";
import icons from "../../Assets/Icons";
import Modal from "../../Components/Modal/Modal";
import { useStoreInputs } from "../../Hooks/InputsLists/useStoreInputs";

const StorageArea = () => {
  useRedirect(USER.role, ROLES.DEPOSITOR);

  const { setShowModal } = useContext(StatesContext);
  const {
    arrayStorageInputs,
    addProductsHandler,
    setInputProductName,
    setInputProductQuantity,
    setInputProductPrice,
  } = useStoreInputs();

  const aceptProduct = (pendingProduct) => {
    console.log("aceptado el producto id ", pendingProduct);
    setInputProductName(pendingProduct.Product);
    setInputProductQuantity(pendingProduct.Quantity);
    setInputProductPrice(pendingProduct.Price);
    setShowModal(true);
  };

  const updatedTBODYPURCHASEHISTORY = TBODYPURCHASEHISTORY.map((entry) => ({
    ...entry,
    Status: (
      <Button
        styles={"pending-table-button"}
        buttonFunction={() => aceptProduct(entry)}
        buttonIcon={<icons.TaskAltRoundedIcon />}
      />
    ),
  }));

  return (
    <div>
      <h2>StorageArea</h2>
      <section>
        <h3>Pending product entry</h3>
        <Table
          thead={THEADPURCHASESHISTORY}
          content={updatedTBODYPURCHASEHISTORY}
        />
      </section>
      <section>
        <h3>Pending products release</h3>
      </section>
      <Modal modalTitle="Entry Product">
        {arrayStorageInputs.map((input, index) => (
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
          buttonFunction={addProductsHandler}
          buttonText="Add Product"
        />
      </Modal>
    </div>
  );
};

export default StorageArea;
