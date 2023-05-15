import { useContext } from "react";
import Table from "../Tables/Table";
import StatesContext from "../../Contexts/StatesContext";

const CartList = () => {
  const { cartData } = useContext(StatesContext);
  return (
    <>
      {cartData.length === 0 ? null : (
        <>
          <hr className="division-horizontal-hr" />
          <div className="cart-content">
            <h3>Cart</h3>
            <div className="cart-table">
              {cartData.length === 0 ? (
                <p>No se han cargado productos</p>
              ) : (
                <Table
                  content={cartData}
                  thead={["Product", "Quantity", "Price"]}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartList;
