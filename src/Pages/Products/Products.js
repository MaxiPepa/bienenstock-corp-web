import { useContext, useEffect, useState } from "react";

import { parsingDate } from "Assets/Parsing";

import { Table } from "Components";
import { APIContext } from "Contexts";

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
        <Table
          thead={["Product Code", "Name", "Quantity", "Expiration Date"]}
          mapKeys={["productCode", "name", "quantity", "expirationDate"]}
          content={products}
          entity="products"
        />
      </section>
    </div>
  );
};

export default Products;
