import { useState, useContext } from "react";
import StatesContext from "../../Contexts/StatesContext";

export const usePurchaseInputs = () => {
  const { setShowModal } = useContext(StatesContext);
  const [inputProductName, setInputProductName] = useState("");
  const [inputProductPrice, setInputProductPrice] = useState("");
  const [inputProductQuantity, setInputProductQuantity] = useState("");
  const [inputSupplier, setInputSupplier] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  const arrayPurchaseInputs = [
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
    {
      labelName: "Supplier",
      styles: "input",
      type: "text",
      placeholder: "Frávega, Garbarino, Megatone...",
      value: inputSupplier,
      inputFunction: setInputSupplier,
    },
    {
      labelName: "Descritcion",
      styles: "input",
      type: "text",
      placeholder: "Video game console, notebook asus 75g, iphone 14...",
      value: inputDescription,
      inputFunction: setInputDescription,
    },
  ];

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
    setShowModal(false);
  };

  return {
    arrayPurchaseInputs,
    buyProductsHandler,
  };
};
