import { useState } from "react";

export const useStoreInputs = () => {
  const [inputProductName, setInputProductName] = useState("");
  const [inputProductQuantity, setInputProductQuantity] = useState("");
  const [inputProductPrice, setInputProductPrice] = useState("");
  const [inputSupplier, setInputSupplier] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [expiration, setExpiration] = useState(false);
  const [expirationDate, setExpirationDate] = useState("");

  const arrayPurchaseInputs = [
    {
      labelName: "Product name: ",
      styles: "input",
      type: "text",
      placeholder: "Laptop, tablet, phone...",
      value: inputProductName,
      inputFunction: setInputProductName,
    },
  ];

  const inputsValues = [
    inputProductName,
    inputProductQuantity,
    inputProductPrice,
    inputSupplier,
    inputDescription,
    expiration,
    expirationDate,
  ];

  const setsInputs = [
    setInputProductName,
    setInputProductQuantity,
    setInputProductPrice,
    setInputSupplier,
    setInputDescription,
    setExpiration,
    setExpirationDate,
  ];

  const addProductsHandler = () => {
    const productObj = {
      name: inputProductName,
      price: inputProductPrice,
      quantity: inputProductQuantity,
      supplier: inputSupplier,
      description: inputDescription,
      entryDate: new Date().toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };
    console.log(productObj);
  };

  return {};
};
