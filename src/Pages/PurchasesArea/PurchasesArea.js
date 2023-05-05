import React, { useContext, useState } from "react";
import useRedirect from "../../Hooks/Redirect/useRedirect";

import { USER, ROLES } from "../../Assets/Constants";
import StatesContext from "../../Contexts/StatesContext";

import Button from "../../Components/Button/Button";
import Modal from "../../Components/Modal/Modal";
import Input from "../../Components/Input/Input";

import icons from "../../Assets/Icons";
import "./PurchasesArea.css";

const PurchansingArea = () => {
  useRedirect(USER.role, ROLES.BUYER);

  const [inputProductName, setInputProductName] = useState("");
  const [inputProductPrice, setInputProductPrice] = useState("");
  const [inputProductQuantity, setInputProductQuantity] = useState("");
  const [inputSupplier, setInputSupplier] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  const { setShowModal, showModal } = useContext(StatesContext);

  const modalStatusHandler = () => {
    setShowModal(!showModal);
  };

  const buyProductsHandler = () => {
    const productObj = {
      name: inputProductName,
      price: inputProductPrice,
      quantity: inputProductQuantity,
      supplier: inputSupplier,
      description: inputDescription,
      purchaseDate: new Date().toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };
    console.log(productObj);
  };

  const arrayInputs = [
    {
      labelName: "Nombre del Producto",
      styles: "input",
      type: "text",
      placeholder: "Laptop, tablet, celular...",
      value: inputProductName,
      inputFunction: setInputProductName,
    },
    {
      labelName: "Precio del Producto",
      styles: "input",
      type: "number",
      placeholder: "$x.xxx,xx",
      value: inputProductPrice,
      inputFunction: setInputProductPrice,
    },
    {
      labelName: "Cantidad del Producto",
      styles: "input",
      type: "number",
      placeholder: "xxx",
      value: inputProductQuantity,
      inputFunction: setInputProductQuantity,
    },
    {
      labelName: "Proveedor",
      styles: "input",
      type: "text",
      placeholder: "Frávega, Garbarino, Megatone...",
      value: inputSupplier,
      inputFunction: setInputSupplier,
    },
    {
      labelName: "Descripción",
      styles: "input",
      type: "text",
      placeholder: "Consola de videojuegos, notebook, celular...",
      value: inputDescription,
      inputFunction: setInputDescription,
    },
  ];

  return (
    <div>
      <h2>PurchasesArea</h2>
      <Button
        styles=""
        buttonFunction={modalStatusHandler}
        buttonIcon={<icons.ShoppingCartRoundedIcon />}
        buttonText="Comprar"
      />
      <Modal modalTitle="Nueva Compra" enterFunction={buyProductsHandler}>
        {arrayInputs.map((input, index) => (
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
