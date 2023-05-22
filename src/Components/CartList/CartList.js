import components from "../../Assets/Components";

const CartList = ({ cartData }) => {
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
                <components.Table
                  content={cartData}
                  thead={["Product Code", "Product", "Quantity", "Unit Price"]}
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
