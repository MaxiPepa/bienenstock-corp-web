import { useForm } from "react-hook-form";

import { arrayPurchaseProductInputs } from "../../Assets/Constants";

import { ShoppingCartRoundedIcon } from "../../Assets/Icons";
import { useProductsValidation } from "../../Assets/Hooks";

const ProductForm = ({ setCartData }) => {
  const { requiredValidations, errorMessages } = useProductsValidation();

  const {
    register: registerCart,
    handleSubmit: handleSubmitCart,
    reset: resetCart,
    formState: { errors: errorsCart },
  } = useForm();

  const onSbubmitCart = (data) => {
    data.productCode = data.productCode.toUpperCase();
    setCartData((prevState) => [...prevState, data]);
    resetCart();
  };

  return (
    <form
      onSubmit={handleSubmitCart(onSbubmitCart)}
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
