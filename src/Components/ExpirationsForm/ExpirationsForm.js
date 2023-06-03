import { useContext } from "react";
import { useForm } from "react-hook-form";

import { APIContext, StatesContext } from "Contexts";
import { AddRoundedIcon } from "Assets/Icons";

import "./ExpirationsForm.css";

const ExpirationsForm = ({ expiration, currentPurchaseId, products }) => {
  const { post } = useContext(APIContext);
  const { setAlert, setShowModal } = useContext(StatesContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const validateDate = (value) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      return "The expiration date cannot be less than or equal to the current date.";
    }
    return true;
  };

  const onSubmit = (data) => {
    const stockObj = {
      purchaseId: currentPurchaseId,
      expirationDates: products
        .map((product, index) =>
          expiration[index]
            ? {
                productId: product.productId,
                expirationDate: data[product.productCode]
                  ? new Date(data[product.productCode]).toISOString()
                  : "",
              }
            : null
        )
        .filter((item) => item !== null),
    };

    post("purchase/completePurchase", stockObj).then((res) => {
      setAlert({
        show: true,
        message: res.message,
        type: res.success ? "success" : "error",
      });

      setShowModal(false);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="inputs-content">
        <div className="inputs-maped">
          {products.map((item, index) =>
            expiration[index] ? (
              <div
                id="input-content-expiration"
                className="input-content"
                key={index}
              >
                <label>{"Vencimiento " + item.name}</label>
                <input
                  className="input"
                  type="date"
                  {...register(item.productCode, {
                    required: true,
                    validate: validateDate,
                  })}
                />
                {
                  <span
                    id="error-input-message-expiration"
                    className="error-input-message"
                  >
                    {errors[item.productCode] &&
                      (errors[item.productCode].type === "required"
                        ? "This field is required."
                        : errors[item.productCode].message)}
                  </span>
                }
              </div>
            ) : null
          )}
        </div>
        <div className="button-content">
          <button type="submit" className="modal-button-add">
            {<AddRoundedIcon />}
            <span>Add to Stock</span>
          </button>
        </div>
      </form>
    </>
  );
};

export default ExpirationsForm;
