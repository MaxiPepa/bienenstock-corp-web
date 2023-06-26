import { useContext } from "react";
import { useForm } from "react-hook-form";

import {
  arraySaleAditionalInputs,
  paymentTypeTranslator,
} from "Assets/Constants";

import { useProductsValidation } from "Hooks";
import { APIContext, StatesContext } from "Contexts";
import { AddRoundedIcon } from "Assets/Icons";

const AditionalInfoForm = ({ cartData, setCartData, setShowInputsModal }) => {
  const { setAlert, setShowModal } = useContext(StatesContext);
  const { post } = useContext(APIContext);

  const { requiredValidations, errorMessages } = useProductsValidation();

  const {
    register: registerSale,
    handleSubmit: handleSubmitSale,
    reset: resetSale,
    formState: { errors: errorsSale },
  } = useForm();

  const onSubmitSale = (data) => {
    if (cartData.length === 0) {
      setAlert({
        show: true,
        message: "You must add at least one product to the cart",
        type: "error",
      });
    } else {
      const saleDate = new Date(data.saleDate);
      const timezoneOffset = saleDate.getTimezoneOffset();
      saleDate.setMinutes(saleDate.getMinutes() - timezoneOffset);
      const rq = {
        ...data,
        saleDate: saleDate.toISOString(),
        products: cartData.map((i) => ({
          productId: i.productId,
          productName: i.name,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
        })),
        billingInformation: {
          businessName: data.businessName,
          billType: data.billType,
          paymentType: paymentTypeTranslator(data.paymentType),
          consumerAddress: data.address,
          consumerIdentifier: data.identifier,
        },
      };
      post("Sale/SaveSale", rq).then((res) => {
        setAlert({
          show: true,
          message: res.message,
          type: res.success ? "success" : "error",
        });
        resetSale();
        setCartData([]);
        setShowModal(false);
        setShowInputsModal(false);
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmitSale(onSubmitSale)}
      className="inputs-content"
      noValidate
    >
      {arraySaleAditionalInputs.map((input, index) => (
        <div className="inputs-maped" key={index}>
          <div className="input-content">
            <label>{input.labelName}</label>
            <input
              className={input.styles}
              type={input.type}
              placeholder={input.placeholder}
              {...registerSale(
                input.formData,
                requiredValidations(input.formData)
              )}
            />
          </div>
          {errorsSale[input.formData] && (
            <p className="error-input-message">
              {errorMessages(errorsSale[input.formData])}
            </p>
          )}
        </div>
      ))}
      <div className="input-content">
        <label>Payment Type</label>
        <select
          {...registerSale("paymentType", { required: true })}
          defaultValue=""
        >
          <option value="" disabled>
            --Select option--
          </option>
          <option value="cash">Cash</option>
          <option value="creditCard">Credit Card</option>
          <option value="currentAccount">Current Account</option>
          <option value="paycheck">Paycheck</option>
        </select>
        {errorsSale["paymentType"] && (
          <p className="error-input-message">
            {errorMessages(errorsSale["paymentType"])}
          </p>
        )}
      </div>
      <div className="input-content">
        <label>Bill Type</label>
        <select
          {...registerSale("billType", { required: true })}
          defaultValue=""
        >
          <option value="" disabled>
            --Select option--
          </option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        {errorsSale["billType"] && (
          <p className="error-input-message">
            {errorMessages(errorsSale["billType"])}
          </p>
        )}
      </div>
      <div className="button-content">
        <button type="submit" className="modal-button-add">
          {<AddRoundedIcon />}
          <span>Complete Sale</span>
        </button>
      </div>
    </form>
  );
};

export default AditionalInfoForm;
