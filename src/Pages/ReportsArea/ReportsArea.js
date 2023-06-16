import { useContext,useCallback,useEffect,useState } from "react";

import { APIContext } from "Contexts";

import { Button, LineCharts, Table } from "Components";

import  "./ReportsArea.css";

const ReportsArea = () => {

  const [products,setProducts] = useState();
  const [purchases,setPurchases] = useState([]);
  const [changeChart,setChangeChart] = useState(false)

  const { get } = useContext(APIContext);

  const getSales = useCallback(()=>{
    get("sale/getSales").then((data) => {
        console.log(
        data.sales.map((r) => ({
          saleId: "#" + r.saleId,
          userFullName: r.userFullName,
          totalPrice: "$" + r.totalPrice,
          date: r.date,
          products: r.products.map((p) => ({
            productCode: "#" + p.productCode,
            name: p.name,
            quantity: p.quantity,
            unitPrice: "$" + p.unitPrice,
          })),
          status: r.dispatched,
        }))
      );
    });
  },[get])
 
  const getPurchases = useCallback(()=>{
    get("purchase/getPurchases").then((data) => {
      setPurchases(
        data.purchases.map((r) => ({
          purchaseId: "#" + r.purchaseId,
          userFullName: r.userFullName,
          supplier: r.supplier,
          totalPrice: "$ " + r.totalPrice,
          date: r.date,
          products: r.products.map((p) => ({
            productCode: "#" + p.productCode,
            name: p.name,
            quantity: p.quantity,
            unitPrice: "$ " + p.unitPrice,
          }))
        })) 
      )
    });
  },[get]);

  const getProducts = useCallback(() => {
    get("product/getProductsStock").then((data) => {
      setProducts(
        data.products.map((res) => ({
          name: res.name,
        }))
      );
    });
  }, [get]);

  useEffect(() => {
    getProducts();
    getPurchases();
    getSales()
  }, [getProducts,getPurchases,getSales]);

  const changeChartHandler = () => {
    changeChart? setChangeChart(false) : setChangeChart(true) 
  }

  const extractData = () => {

    let dates = purchases.map(x =>{
      const date = new Date(x.date);
      const formattedDate = date.toISOString().split('T')[0];
      return formattedDate;
    })

    let quantity = purchases.map(obj => obj.products.reduce((acc, product) => acc + product.quantity, 0));

    return {dates,quantity}
  }

  return (
    <div>
      <h2 className="area-title">ReportsArea</h2>
      <div className="analyst-div">
        <div className="analyst-table">
          <h3>List products</h3>
          <Table
            thead={["name"]}
            mapKeys={["name"]}
            content={products}
            entity="products"
          />
        </div>
        <div className="charts">          
          <div className="lineChart">
            <h2>{changeChart ? "Sales" : "Purchase"}</h2>
            <LineCharts axes={extractData()} title={changeChart ? "Sales" : "Purchase"}/>
          </div>
        </div>
        <div>
          <Button 
            buttonText={!changeChart ? "Sales" : "Purchase"} 
            buttonFunction={changeChartHandler} 
          />
        </div>
      </div>
    </div>
  );
};

export default ReportsArea;
