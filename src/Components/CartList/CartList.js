import { Table } from "Components";

const CartList = ({ cartData }) => {
  return (
    <>
      {cartData.length === 0 ? null : (
        <>
          <hr className="division-horizontal-hr" />
          <div className="cart-content">
            <h3>Cart</h3>
            <div className="cart-table">
              <Table
                content={cartData}
                mapKeys={["productCode", "name", "quantity", "unitPrice"]}
                thead={["Product Code", "Product", "Quantity", "Unit Price"]}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartList;
