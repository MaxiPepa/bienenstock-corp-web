import { useContext,useCallback,useEffect,useState } from "react";

import { APIContext } from "Contexts";

import { Button, LineCharts, Table,Bars } from "Components";

import  "./ReportsArea.css";
import BoxItem from "Components/Boxes/BoxItem/BoxItem";

const ReportsArea = () => {

  const [sales,setSales] = useState([]);
  const [products,setProducts] = useState();
  const [purchases,setPurchases] = useState([]);
  const [totalIncome,setTotalIncome] = useState([]);
  const [changeChart,setChangeChart] = useState(false)
  const [salesCancelled, setSalesCancelled] = useState([]); 
  const { get } = useContext(APIContext);

  const setBars = () => {
    return {
      sales: sales.length,
      purchases: purchases.length
    }
  }

  const getSales = useCallback(()=>{
    get("sale/getSales").then((data) => {
      console.log(data.sales)
      setSalesCancelled(data.sales.filter((r)=>r.cancelled === true).length)
      setSales(data.sales.filter((r)=> r.dispatched === true ))
      setTotalIncome(data.sales.reduce((sum, obj) => sum + obj.totalPrice, 0)); 

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

  const extracPurchasestData = () => {

    const dates = purchases.map(x =>{
      const date = new Date(x.date);
      const formattedDate = date.toISOString().split('T')[0];
      return formattedDate;
    })

    const quantity = purchases.map(obj => obj.products.reduce((acc, product) => acc + product.quantity, 0));

    return {dates,quantity}
  }

  const extracSalesData = () => {

    const dates = sales.map(x =>{
      const date = new Date(x.date);
      const formattedDate = date.toISOString().split('T')[0];
      return formattedDate;
    })

    const quantity = sales.map(obj => obj.products.reduce((total, product) => total + product.quantity, 0));

    return {dates,quantity}
  }

  return (
    <div>
      <h2 className="area-title">ReportsArea</h2>
      <div className="analyst-div">
        {/* <div className="analyst-table">
          <h3>List products</h3>
          <Table
            thead={["name"]}
            mapKeys={["name"]}
            content={products}
            entity="products"
          />
        </div> */}
        <div className="charts">          
          <div className="lineChart">
            <h2>{changeChart ? "Sales" : "Purchase"} evolution</h2>
            <LineCharts axes={changeChart ? extracSalesData() : extracPurchasestData() } title={changeChart ? "Sales" : "Purchase"}/>
            <hr></hr>
            <Bars values={setBars()}/>
          </div>
          <div className="analyst-card">
            <BoxItem quantity={sales.length} title="Total completed Sales"  color="green" />
            <BoxItem quantity={salesCancelled} title="Total cancelled Sales"  color="grey" />
          </div>
          <div className="analyst-card">
            <BoxItem quantity={"$" + totalIncome} title="sales revenue"  color="green" />
          </div>
        </div>
        <div>
          <Button 
            styles="area-button"
            buttonText={!changeChart ? "Sales" : "Purchase"} 
            buttonFunction={changeChartHandler} 
          />
        </div>
      </div>
    </div>
  );
};

export default ReportsArea;
