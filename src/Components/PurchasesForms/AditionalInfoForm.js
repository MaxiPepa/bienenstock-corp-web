import { useContext } from "react";
import { useForm } from "react-hook-form";

import { arrayPurchaseAditionalInputs } from "Assets/Constants";

import { useProductsValidation } from "Hooks";
import { APIContext, StatesContext } from "Contexts";
import { AddRoundedIcon } from "Assets/Icons";

const AditionalInfoForm = ({ cartData, setCartData, setShowInputsModal }) => {
  const { setAlert, setShowModal } = useContext(StatesContext);
  const { post } = useContext(APIContext);

  const { requiredValidations, errorMessages } = useProductsValidation();

  const {
    register: registerPurchase,
    handleSubmit: handleSubmitPurchase,
    reset: resetPurchase,
    formState: { errors: errorsPurchase },
  } = useForm();

  const onSubmitPurchase = (data) => {
    if (cartData.length === 0) {
      setAlert({
        show: true,
        message: "You must add at least one product to the cart",
        type: "error",
      });
    } else {
      const rq = {
        ...data,
        purchaseDate: new Date(data.purchaseDate).toISOString(),
        products: cartData,
      };
      console.log(rq);
      post("purchase/savePurchase", rq).then((res) => {
        setAlert({
          show: true,
          message: res.message,
          type: res.success ? "success" : "error",
        });
        resetPurchase();
        setCartData([]);
        setShowModal(false);
        setShowInputsModal(false);
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmitPurchase(onSubmitPurchase)}
      className="inputs-content"
      noValidate
    >
      {arrayPurchaseAditionalInputs.map((input, index) => (
        <div className="inputs-maped" key={index}>
          <div className="input-content">
            <label>{input.labelName}</label>
            <input
              className={input.styles}
              type={input.type}
              placeholder={input.placeholder}
              {...registerPurchase(
                input.formData,
                requiredValidations(input.formData)
              )}
            />
          </div>
          {errorsPurchase[input.formData] && (
            <p className="error-input-message">
              {errorMessages(errorsPurchase[input.formData])}
            </p>
          )}
        </div>
      ))}
      <div className="button-content">
        <button type="submit" className="modal-button-add">
          {<AddRoundedIcon />}
          <span>Finish Purchase</span>
        </button>
      </div>
    </form>
  );
};

export default AditionalInfoForm;
