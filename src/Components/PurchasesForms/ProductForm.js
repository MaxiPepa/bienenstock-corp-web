import { useForm } from "react-hook-form";
import icons from "../../Assets/Icons";

import { usePurchaseInputs } from "../../Hooks/InputsLists/usePurchaseInputs";

const ProductForm = () => {
  const { addToCartHandler, arrayPurchaseProductInputs, requiredValidations } =
    usePurchaseInputs();

  const {
    register: registerCart,
    handleSubmit: handleSubmitCart,
    reset: resetCart,
    formState: { errors: errorsCart },
  } = useForm();

  const onSbubmitCart = (data) => {
    addToCartHandler(data);
    resetCart();
  };

  return (
    <form onSubmit={handleSubmitCart(onSbubmitCart)} className="inputs-content">
      {arrayPurchaseProductInputs.map((input, index) => (
        <div className="inputs-maped" key={index}>
          <div className="input-content">
            <label>{input.labelName}</label>
            <input
              className={input.styles}
              type={input.type}
              placeholder={input.placeholder}
              {...registerCart(input.formData, requiredValidations(input.type))}
            />
          </div>
          {errorsCart[input.formData] && (
            <p className="error-input-message">
              {errorsCart[input.formData].type === "required"
                ? "This field is required"
                : errorsCart[input.formData].type === "min"
                ? "The value must be greater than 0"
                : null}
            </p>
          )}
        </div>
      ))}
      <div className="button-content">
        <p></p>
        <button type="submit" className="modal-button-add">
          {<icons.ShoppingCartRoundedIcon />}
          <span>Add to cart</span>
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
