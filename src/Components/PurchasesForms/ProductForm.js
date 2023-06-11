import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { arrayPurchaseProductInputs } from "Assets/Constants";

import { APIContext } from "Contexts";
import { useProductsValidation } from "Hooks";
import { ShoppingCartRoundedIcon } from "Assets/Icons";

const ProductForm = ({ setCartData }) => {
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

  const onProductCodeChange = (event) => {
    const productCode = event.target.value.toUpperCase();
    const product = productsCodes.find((p) => p.productCode === productCode);
    if (product) {
      setValue("name", product.productName);
      setProductNameDisabled(true);
    } else {
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
              step={input.step ? input.step : null}
              min={input.min ? input.min : null}
              max={input.max ? input.max : null}
              maxLength={input.maxLength ? input.maxLength : null}
              {...registerCart(
                input.formData,
                requiredValidations(input.formData)
              )}
              onChange={
                input.formData === "productCode"
                  ? onProductCodeChange
                  : undefined
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
