import { useContext } from "react";
import StatesContext from "../../Contexts/StatesContext";

export const usePurchaseInputs = () => {
  const { setShowModal, cartData, setCartData } = useContext(StatesContext);

  const arrayPurchaseProductInputs = [
    {
      labelName: "Product name: ",
      styles: "input",
      type: "text",
      placeholder: "Laptop, tablet, phone...",
      formData: "productName",
    },
    {
      labelName: "Product unit price: ",
      styles: "input",
      type: "number",
      placeholder: "$x.xxx,xx",
      formData: "productPrice",
    },
    {
      labelName: "Product Quantity: ",
      styles: "input",
      type: "number",
      placeholder: "xxx",
      formData: "productQuantity",
    },
  ];

  const arrayPurchaseAditionalInputs = [
    {
      labelName: "Supplier: ",
      styles: "input",
      type: "text",
      placeholder: "Fravega, Musimundo, Garbarino...",
      formData: "supplier",
    },
    {
      labelName: "Purchase date: ",
      styles: "input",
      type: "date",
      placeholder: "dd/mm/aaaa",
      formData: "purchaseDate",
    },
  ];

  const validateDate = (value) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      return "La fecha debe ser igual o menor al día actual";
    }

    return true;
  };

  const requiredValidations = (inputType) => {
    if (inputType === "text") {
      return { required: true };
    } else if (inputType === "number") {
      return { required: true, min: 1 };
    } else if (inputType === "date") {
      return { required: true, validate: validateDate };
    }
  };

  const addToCartHandler = (productObj) => {
    console.log(productObj);
    setCartData([...cartData, productObj]);
  };

  const finishPurchaseHandler = (cartObj) => {
    const purchaseObj = {
      ...cartObj,
      cartData,
    };
    console.log(purchaseObj);
    setCartData([]);
    setShowModal(false);
  };

  return {
    arrayPurchaseProductInputs,
    arrayPurchaseAditionalInputs,
    addToCartHandler,
    finishPurchaseHandler,
    requiredValidations,
  };
};
