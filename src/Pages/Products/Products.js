import { useContext, useEffect, useState } from "react";

import { parsingDate } from "../../Assets/Parsing";

import { Table } from "../../Assets/Components";
import { APIContext } from "../../Assets/Contexts";

const Products = () => {
  const { get } = useContext(APIContext);

  const [products, setProducts] = useState();

  useEffect(() => {
    get("product/getProductsStock").then((data) => {
      setProducts(
        data.products.map((res) => ({
          productCode: "#" + res.productCode,
          name: res.name,
          expirationDate:
            res.expirationDate === null
              ? "No expiration date"
              : parsingDate(res.expirationDate),
          quantity: res.quantity,
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
          thead={["Product Code", "Name", "Expiration Date", "Quantity"]}
          content={products ? products : []}
        />
      </section>
    </div>
  );
};

export default Products;
