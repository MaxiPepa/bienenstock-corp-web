import { useState, useContext } from "react";
import StatesContext from "../../Contexts/StatesContext";

export const usePurchaseInputs = () => {
  const { setShowModal } = useContext(StatesContext);
  const [inputProductName, setInputProductName] = useState("");
  const [inputProductPrice, setInputProductPrice] = useState("");
  const [inputProductQuantity, setInputProductQuantity] = useState("");
  const [inputSupplier, setInputSupplier] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [cartList, setCartList] = useState([]);

  const arrayPurchaseProductInputs = [
    {
      labelName: "Product name: ",
      styles: "input",
      type: "text",
      placeholder: "Laptop, tablet, phone...",
      value: inputProductName,
      inputFunction: setInputProductName,
    },
    {
      labelName: "Product unit price: ",
      styles: "input",
      type: "number",
      step: "0.01",
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

  const arrayPurchaseAditionalInputs = [
    {
      labelName: "Supplier: ",
      styles: "input",
      type: "text",
      placeholder: "Fravega, Musimundo, Garbarino...",
      value: inputSupplier,
      inputFunction: setInputSupplier,
    },
    {
      labelName: "Purchase date: ",
      styles: "input",
      type: "date",
      placeholder: "dd/mm/aaaa",
      value: purchaseDate,
      inputFunction: setPurchaseDate,
    },
  ];

  const cleanInputs = () => {
    setInputProductName("");
    setInputProductPrice("");
    setInputProductQuantity("");
  };

  const addToCartHandler = () => {
    const productObj = {
      productName: inputProductName,
      productQuantity: inputProductQuantity,
      productPrice: "$" + inputProductPrice,
    };
    setCartList([...cartList, productObj]);
    cleanInputs();
  };

  const finishPurchaseHandler = () => {
    console.log(cartList);
    setCartList([]);
  };

  return {
    arrayPurchaseProductInputs,
    arrayPurchaseAditionalInputs,
    addToCartHandler,
    finishPurchaseHandler,
    cartList,
  };
};
