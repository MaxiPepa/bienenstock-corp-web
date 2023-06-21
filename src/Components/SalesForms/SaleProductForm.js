import { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import Select from "react-select";

import { selectStyles } from "Assets/Constants";
import { APIContext } from "Contexts";
import { useProductsValidation } from "Hooks";
import { ShoppingCartRoundedIcon } from "Assets/Icons";

const SaleProductForm = ({ setCartData }) => {
  const { get } = useContext(APIContext);
  const { requiredValidations, errorMessages } = useProductsValidation();

  const [arrayStockProduct, setArrayStockProduct] = useState([]);
  const [currentStock, setCurrentStock] = useState(null);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    control,
  } = useForm();

  useEffect(() => {
    get("Product/GetProductsStock").then((data) => {
      setArrayStockProduct(
        data.products.map((item) => ({
          value: item.productId,
          label: item.name + " - " + item.productCode,
          name: item.name,
          productCode: item.productCode,
          expirationDate: item.expirationDate,
          quantity: item.quantity,
        }))
      );
    });
  }, [get]);

  const resetCart = (productId) => {
    setArrayStockProduct(
      arrayStockProduct.filter((x) => x.value !== productId)
    );
    setCurrentStock(null);
    reset();
  };

  const onSubmitCart = (data) => {
    const newProduct = {
      productId: data.product.value,
      productCode: data.product.productCode,
      name: data.product.name,
      quantity: data.quantity,
      unitPrice: data.unitPrice,
    };
    setCartData((prevState) => [...prevState, newProduct]);
    resetCart(newProduct.productId);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitCart)}
      className="inputs-content"
      noValidate
    >
      <div className="input-content">
        <label>Product name - Product code </label>
        <Controller
          control={control}
          name="product"
          rules={{ required: true }}
          render={({ field: { onChange, value, name, ref } }) => (
            <Select
              options={arrayStockProduct}
              noOptionsMessage={() => "No products in stock"}
              styles={selectStyles}
              inputRef={ref}
              value={
                value ? arrayStockProduct.find((e) => e.value === value) : null
              }
              onChange={(val) => {
                onChange(val);
                setCurrentStock(val.quantity);
              }}
              name={name}
            />
          )}
        />
        {errors.product?.type === "required" && (
          <p className="error-input-message">This field is required.</p>
        )}

        <label>
          Product Quantity
          {currentStock ? (
            <span className="quantityStockProduct">
              (Stock: {currentStock})
            </span>
          ) : null}
        </label>
        <input
          type="number"
          min={1}
          max={currentStock ? currentStock : null}
          placeholder={currentStock ? "Máx. " + currentStock : null}
          {...register("quantity", requiredValidations("quantity"))}
        />

        {errors.quantity && (
          <p className="error-input-message">
            {errorMessages(errors.quantity)}
          </p>
        )}

        <label>Product unit price:</label>
        <input
          type="number"
          step={0.01}
          min={0.01}
          placeholder="$X.XXX,XX"
          {...register("unitPrice", requiredValidations("unitPrice"))}
        />
        {errors.unitPrice && (
          <p className="error-input-message">
            {errorMessages(errors.unitPrice)}
          </p>
        )}
      </div>

      <div className="button-content">
        <button type="submit" className="modal-button-add">
          {<ShoppingCartRoundedIcon />}
          <span>Add to cart</span>
        </button>
      </div>
    </form>
  );
};

export default SaleProductForm;
