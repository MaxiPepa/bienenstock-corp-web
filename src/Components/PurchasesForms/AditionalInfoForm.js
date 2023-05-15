import { useContext } from "react";
import { useForm } from "react-hook-form";
import icons from "../../Assets/Icons";
import Alert from "../Alert/Alert";

import { usePurchaseInputs } from "../../Hooks/InputsLists/usePurchaseInputs";
import StatesContext from "../../Contexts/StatesContext";

const AditionalInfoForm = () => {
  const { functionAlert, showAlert, cartData } = useContext(StatesContext);

  const {
    finishPurchaseHandler,
    arrayPurchaseAditionalInputs,
    requiredValidations,
  } = usePurchaseInputs();

  const {
    register: registerPurchase,
    handleSubmit: handleSubmitPurchase,
    reset: resetPurchase,
    formState: { errors: errorsPurchase },
  } = useForm();

  const onSbubmitPurchase = (data) => {
    if (cartData.length === 0) {
      functionAlert();
    } else {
      finishPurchaseHandler(data);
      resetPurchase();
    }
  };

  return (
    <form
      onSubmit={handleSubmitPurchase(onSbubmitPurchase)}
      className="inputs-content"
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
                requiredValidations(input.type)
              )}
            />
          </div>
          {errorsPurchase[input.formData] && (
            <p className="error-input-message">
              {errorsPurchase[input.formData].type === "required"
                ? "This field is required"
                : errorsPurchase[input.formData].type === "min"
                ? "The value must be greater than 0"
                : errorsPurchase[input.formData].type === "validate"
                ? "The date must be equal or less than the current date"
                : null}
            </p>
          )}
        </div>
      ))}
      <div className="button-content">
        {showAlert ? (
          <Alert
            alertType="error"
            alertMessage="Must load at least one product"
          />
        ) : (
          <p></p>
        )}
        <button type="submit" className="modal-button-add">
          {<icons.AddRoundedIcon />}
          <span>Finish Purchase</span>
        </button>
      </div>
    </form>
  );
};

export default AditionalInfoForm;
