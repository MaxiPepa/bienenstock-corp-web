import { useState } from "react";

export const usePurchaseInputs = () => {
  const [inputProductName, setInputProductName] = useState("");
  const [inputProductPrice, setInputProductPrice] = useState("");
  const [inputProductQuantity, setInputProductQuantity] = useState("");
  const [inputSupplier, setInputSupplier] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  const arrayPurchaseInputs = [
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

  return {
    arrayPurchaseInputs,
    buyProductsHandler,
  };
};
