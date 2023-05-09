import { useState } from "react";

export const useStoreInputs = () => {
  const [inputProductName, setInputProductName] = useState("");
  const [inputProductQuantity, setInputProductQuantity] = useState("");
  const [inputProductPrice, setInputProductPrice] = useState("");
  const [expiration, setExpiration] = useState(false);
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

  const inputsValues = [
    inputProductName,
    inputProductQuantity,
    inputProductPrice,
    expiration,
    expirationDate,
  ];

  const addProductsHandler = () => {
    const productObj = {
      name: inputProductName,
      price: inputProductPrice,
      quantity: inputProductQuantity,
      entryDate: new Date().toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };
    console.log(productObj);
  };

  return {
    arrayStorageInputs,
    inputsValues,
    setInputProductName,
    setInputProductQuantity,
    setInputProductPrice,
    setExpiration,
    setExpirationDate,
    addProductsHandler,
  };
};
