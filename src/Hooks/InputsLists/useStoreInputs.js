import { useState, useContext } from "react";
import StatesContext from "../../Contexts/StatesContext";

export const useStoreInputs = () => {
  const { setShowModal, setShowExpiration } = useContext(StatesContext);
  const [inputProductName, setInputProductName] = useState("");
  const [inputProductQuantity, setInputProductQuantity] = useState("");
  const [inputProductPrice, setInputProductPrice] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const arrayStorageInputs = [
    {
      labelName: "Product name: ",
      styles: "input",
      type: "text",
      placeholder: "Laptop, tablet, phone...",
      value: inputProductName,
      inputFunction: setInputProductName,
    },
    {
      labelName: "Product price: ",
      styles: "input",
      type: "number",
      placeholder: "$x.xxx,xx",
      value: inputProductPrice,
      inputFunction: setInputProductPrice,
    },
    {
      labelName: "Product Quantity: ",
      styles: "input",
      type: "number",
      placeholder: "xxx",
      value: inputProductQuantity,
      inputFunction: setInputProductQuantity,
    },
  ];

  const cleanInputs = () => {
    setInputProductName("");
    setInputProductPrice("");
    setInputProductQuantity("");
    setExpirationDate("");
  };

  const addProductsHandler = () => {
    const productObj = {
      name: inputProductName,
      price: inputProductPrice,
      quantity: inputProductQuantity,
      expirationDate: expirationDate,
      entryDate: new Date().toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };
    console.log(productObj);
    cleanInputs();
    setShowModal(false);
    setShowExpiration(null);
  };

  return {
    arrayStorageInputs,
    inputProductName,
    expirationDate,
    setInputProductName,
    setInputProductQuantity,
    setInputProductPrice,
    setExpirationDate,
    addProductsHandler,
  };
};
