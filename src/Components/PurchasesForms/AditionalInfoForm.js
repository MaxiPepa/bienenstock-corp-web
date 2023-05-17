import { useContext } from "react";
import { useForm } from "react-hook-form";

import StatesContext from "../../Contexts/StatesContext";
import APIContext from "../../Contexts/APIContext";
import { useProductsValidation } from "../../Hooks/Validations/useProductsValidation";
import { arrayPurchaseAditionalInputs } from "../../Assets/Constants";

import icons from "../../Assets/Icons";
import Alert from "../Alert/Alert";

const AditionalInfoForm = ({ cartData, setCartData }) => {
  const { functionAlert, showAlert, setShowModal } = useContext(StatesContext);
  const { post } = useContext(APIContext);

  const { requiredValidations, errorMessages } = useProductsValidation();

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
      const date = new Date(data.purchaseDate);
      const isoPurchaseDate = date.toISOString();
      data.purchaseDate = isoPurchaseDate;

      const rq = {
        ...data,
        products: cartData,
      };
      post("purchase/savePurchase", rq).then((res) => {
        alert(res.message);
        setCartData([]);
        setShowModal(false);
        resetPurchase();
      });
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
