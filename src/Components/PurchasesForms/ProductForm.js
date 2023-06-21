import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { arrayPurchaseProductInputs } from "Assets/Constants";

import { APIContext } from "Contexts";
import { useProductsValidation } from "Hooks";
import { ShoppingCartRoundedIcon } from "Assets/Icons";

const ProductForm = ({ setCartData, cartData }) => {
  const { get } = useContext(APIContext);
  const { requiredValidations, errorMessages } = useProductsValidation();

  const [productsCodes, setProductsCodes] = useState([]);
  const [productNameDisabled, setProductNameDisabled] = useState(true);

  const {
    register: registerCart,
    handleSubmit: handleSubmitCart,
    reset: resetCart,
    formState: { errors: errorsCart },
    setValue,
  } = useForm();

  useEffect(() => {
    get("product/getProductCodes").then((data) => {
      setProductsCodes(
        data.productCodes.map((res) => ({
          productId: res.productId,
          productCode: res.productCode,
          productName: res.productName,
        }))
      );
    });
  }, [get]);

  const onProductCodeBlur = (event) => {
    const productCode = event.target.value.toUpperCase();
    const productStock = productsCodes.find(
      (p) => p.productCode === productCode
    );
    const productCart = cartData.find((p) => p.productCode === productCode);

    if (productStock) {
      setValue("name", productStock.productName);
      setProductNameDisabled(true);
    } else if (productCart) {
      setValue("name", productCart.name);
      setProductNameDisabled(true);
    } else {
      setValue("name", "");
      setProductNameDisabled(false);
    }
  };

  const onSubmitCart = (data) => {
    data.productCode = data.productCode.toUpperCase();
    setCartData((prevState) => [...prevState, data]);
    resetCart();
  };

  return (
    <form
      onSubmit={handleSubmitCart(onSubmitCart)}
      className="inputs-content"
      noValidate
    >
      {arrayPurchaseProductInputs.map((input, index) => (
        <div className="inputs-maped" key={index}>
          <div className="input-content">
            <label>{input.labelName}</label>
            <input
              className={input.styles}
              type={input.type}
              placeholder={input.placeholder}
              step={
                input.type === "number" && input.step ? input.step : undefined
              }
              min={input.type === "number" && input.min ? input.min : undefined}
              max={input.type === "number" && input.max ? input.max : undefined}
              maxLength={
                input.type === "text" && input.maxLength
                  ? input.maxLength
                  : undefined
              }
              {...registerCart(
                input.formData,
                requiredValidations(input.formData)
              )}
              onBlur={
                input.formData === "productCode" ? onProductCodeBlur : undefined
              }
              disabled={
                input.formData === "name" ? productNameDisabled : undefined
              }
            />
          </div>
          {errorsCart[input.formData] && (
            <p className="error-input-message">
              {errorMessages(errorsCart[input.formData])}
            </p>
          )}
        </div>
      ))}
      <div className="button-content">
        <button type="submit" className="modal-button-add">
          {<ShoppingCartRoundedIcon />}
          <span>Add to cart</span>
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
