import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

import { selectStyles } from "Assets/Constants";
import { APIContext } from "Contexts";
import { ShoppingCartRoundedIcon } from "Assets/Icons";


const SaleProductForm = ({ setCartData }) => {
  const { get } = useContext(APIContext);
  const [arrayStockProduct, setArrayStockProduct] = useState([]);
  const [stockProductSelected, setStockProductSelected] = useState();
  const [quantityProductSelected, setQuantityProductSelected] = useState();


  const {
    register: registerCart,
    handleSubmit: handleSubmitCart,
    reset: resetCart,
    formState: { errors: errorsCart },
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
    const quantityProductIndex = arrayStockProduct.find(
      (item) => item.productId === productID
    );
    setStockProductSelected(quantityProductIndex.quantity);
    setQuantityProductSelected("");
  };

  const onSubmitCart = (data) => {
    setCartData((prevState) => [...prevState, data]);
    resetCart();
  };

  const arraySelect = arrayStockProduct.map((item) => ({
    label: item.name + " - " + item.productCode,
    value: item.productId,
  }));

  return (
    <form
      onSubmit={handleSubmitCart(onSubmitCart)}
      className="inputs-content"
      noValidate
    >
      <div className="input-content">
        <label>Product name - Product code </label>
        <Select
          defaultValue={{ label: "Select product", value: "" }}
          options={arraySelect}
          onChange={handleChangeSelect}
          noOptionsMessage={() => "No products in stock"}
          styles={selectStyles}
        />
        <label>Product Quantity</label>
        <input
          type="number"
          min={0}
          max={stockProductSelected}
          value={quantityProductSelected}
          placeholder={
            stockProductSelected ? "Stock: " + stockProductSelected : null
          }
          onChange={(e) => setQuantityProductSelected(e.target.value)}
        />
        <label>Product unit price:</label>
        <input type="number" step={0.01} min={0.01} placeholder="$X.XXX,XX" />
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
