import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Select from "react-select";

import { selectStyles } from "Assets/Constants";
import { APIContext } from "Contexts";
import { ShoppingCartRoundedIcon } from "Assets/Icons";

const SaleProductForm = ({ setCartData }) => {
  const { get } = useContext(APIContext);

  const [arrayStockProduct, setArrayStockProduct] = useState([]);
  const [stockProductSelected, setStockProductSelected] = useState("");
  const [productSelected, setProductSelected] = useState(null);

  const {
    register,
    formState: { errors },
    reset: resetCart,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    get("Product/GetProductsStock").then((data) => {
      setArrayStockProduct(
        data.products.map((item) => ({
          productId: item.productId,
          name: item.name,
          productCode: item.productCode,
          expirationDate: item.expirationDate,
          quantity: item.quantity,
        }))
      );
    });
  }, [get]);

  const handleChangeSelect = ({ value }) => {
    const productID = Number(value);
    const productSelectedLocal = arrayStockProduct.find(
      (item) => item.productId === productID
    );
    setProductSelected(productSelectedLocal);
    setStockProductSelected(productSelectedLocal.quantity);
  };

  const onSubmitCart = (data) => {
    const sendToCart = {
      productCode: productSelected.productCode,
      name: productSelected.name,
    };
    const sendProductsObjet = {...sendToCart, ...data}
    setCartData((prevState) => [...prevState, sendProductsObjet]);
    resetCart();
  };

  const arraySelect = arrayStockProduct.map((item) => ({
    label: item.name + " - " + item.productCode,
    value: item.productId,
  }));

  return (
    <form
      onSubmit={handleSubmit(onSubmitCart)}
      className="inputs-content"
      noValidate
    >
      <div className="input-content">
        <label>Product name - Product code </label>
        <Select
          options={arraySelect}
          onChange={handleChangeSelect}
          noOptionsMessage={() => "No products in stock"}
          styles={selectStyles}
        />
        <label>
          Product Quantity
          {stockProductSelected ? (
            <span className="quantityStockProduct">
              (Stock: {stockProductSelected})
            </span>
          ) : null}
        </label>
        <input
          type="number"
          min={1}
          max={stockProductSelected ? stockProductSelected : null}
          placeholder={
            stockProductSelected ? "Máx. " + stockProductSelected : null
          }
          {...register("quantity", {
            required: true,
            min: 1,
            max: stockProductSelected,
          })}
        />
        {errors.quantity?.type === "required" && (
          <p className="error-input-message">This field is required.</p>
        )}
        {errors.quantity?.type === "min" && (
          <p className="error-input-message">
            The value must be greater than 0.
          </p>
        )}
        {errors.quantity?.type === "max" && (
          <p className="error-input-message">
            The quantity entered cannot exceed the stock of the product.
          </p>
        )}

        <label>Product unit price:</label>
        <input
          type="number"
          step={0.01}
          min={0.01}
          placeholder="$X.XXX,XX"
          {...register("unitPrice", { required: true, min: 0.01 })}
        />
        {errors.unitPrice?.type === "required" && (
          <p className="error-input-message">This field is required.</p>
        )}
        {errors.unitPrice?.type === "required" && (
          <p className="error-input-message">
            The value must be greater than 0.01.
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
