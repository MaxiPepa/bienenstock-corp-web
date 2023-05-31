import { useContext, useEffect, useState } from "react";

import { parsingDate } from "../../Assets/Parsing";

import { Table } from "../../Assets/Components";
import { APIContext } from "../../Assets/Contexts";

const Products = () => {
  const { get } = useContext(APIContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    get("product/getProductsStock").then((data) => {
      setProducts(
        data.products.map((res) => ({
          productCode: "#" + res.productCode,
          name: res.name,
          quantity: res.quantity,
          expirationDate:
            res.expirationDate === null
              ? "No expiration date"
              : parsingDate(res.expirationDate),
        }))
      );
    });
  }, [get]);

  return (
    <div className="area-container">
      <div className="area-header">
        <h2 className="area-title">Products</h2>
      </div>
      <hr className="division-horizontal-hr" />
      <section>
        {products?.length === 0 ? (
          <h3 className="no-table-message">No products in stock</h3>
        ) : (
          <Table
            thead={["Product Code", "Name", "Quantity", "Expiration Date"]}
            mapKeys={["productCode", "name", "quantity", "expirationDate"]}
            content={products}
          />
        )}
      </section>
    </div>
  );
};

export default Products;
