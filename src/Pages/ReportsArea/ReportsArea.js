import { useContext,useCallback,useEffect,useState } from "react";
import { Button, LineCharts,Bars } from "Components";
import { DateRangePicker } from 'react-date-range';

import BoxItem from "Components/Boxes/BoxItem/BoxItem";

import { APIContext } from "Contexts";


import  "./ReportsArea.css";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const ReportsArea = () => {

  const [dates,setDates] = useState([{startDate:new Date("2023-01-01") ,endDate: new Date()}]);
  const [sales,setSales] = useState([]);
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

  useEffect(() => {
    getPurchases();
    getSales()
  }, [getPurchases,getSales]);

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

  const handleSelect = (date) => {
    setDates(date.selection);
  };

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }

  return (
    <div>
      <h2 className="area-title">ReportsArea</h2>
      <div className="analyst-div">
        <div className="charts">          
          <div className="lineChart">
            <h2>{changeChart ? "Sales" : "Purchase"} evolution</h2>
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
            />
            <LineCharts axes={changeChart ? extracSalesData() : extracPurchasestData() } title={changeChart ? "Sales" : "Purchase"} dates={dates}/>
            <hr></hr>
            <Bars values={setBars()}/>
          </div>
          <div>
            <div className="analyst-boxes">
              <div className="analyst-card">
                <BoxItem quantity={sales.length} title="Total completed Sales"  color="rgba(40, 205, 54, 0.738)" />
              </div>
              <div className="analyst-card">
                <BoxItem quantity={salesCancelled} title="Total cancelled Sales"  color="rgba(13, 13, 13, 0.699)" />
              </div>
            </div>
            <BoxItem quantity={"$" + totalIncome} title="sales revenue"  color="rgba(0, 103, 199, 0.699)" />
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
