import { useCallback, useContext, useEffect, useState } from "react";

import { parsingDate } from "Assets/Parsing";

import { Table } from "Components";
import { APIContext, ReaderContext } from "Contexts";

const Products = () => {
  const { get } = useContext(APIContext);
  const { startPageConnection, stopPageConnection } = useContext(ReaderContext);

  const [products, setProducts] = useState([]);

  const getProducts = useCallback(() => {
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

  useEffect(() => {
    getProducts();
    startPageConnection(getProducts, "page", "productHub", "ProductUpdate");
  }, [getProducts, startPageConnection]);

  useEffect(() => {
    return () => {
      stopPageConnection();
    };
  }, [stopPageConnection]);

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
