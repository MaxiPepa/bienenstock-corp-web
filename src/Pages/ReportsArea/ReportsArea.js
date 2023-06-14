import { useContext,useCallback,useEffect,useState } from "react";
import { ROLES } from "Assets/Constants";

import { UserContext,APIContext } from "Contexts";
import { useRedirect } from "Hooks";

import { Table } from "Components";

import  "./ReportsArea.css";

const ReportsArea = () => {

  const [products,setProducts] = useState();

  const { userData } = useContext(UserContext);
  const { get } = useContext(APIContext);
  useRedirect(userData.userType, ROLES.ANALYST);
  
  const getProducts = useCallback(() => {
    get("product/getProductsStock").then((data) => {
      setProducts(
        data.products.map((res) => ({
          productCode: res.productCode,
          name: res.name,
        }))
      );
    });
  }, [get]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div>
      <h2 className="area-title">ReportsArea</h2>
      <div className="box">
        <div>
          <h3>List products</h3>
          <Table
            thead={["Product code", "name"]}
            mapKeys={["productCode" , "name"]}
            content={products}
            entity="products"
          />
        </div>
        <div className="Charts">
          <p>sdfh ajshlfkasklf askfjaklsfjabsfjsfajbñf <br></br>
            asjfbkasbfkjas askjfbkasbfkjbaskbf askjbfkjasfjksfkas<br></br> 
            asjhfkahskfjhaksjf asjfhkjashfjahskf 
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportsArea;
