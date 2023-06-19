import { useContext,useCallback,useEffect,useState } from "react";
import { Button, LineCharts, Bars } from "Components";
import { DateRangePicker } from 'react-date-range';

import BoxItem from "Components/Boxes/BoxItem/BoxItem";

import { APIContext } from "Contexts";


import  "./ReportsArea.css";
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

//SE AGREGA UN SELECT PARA VISUALIZAR DISTITNOS GRAFICOS
const ReportsArea = () => {

  const [sales,setSales] = useState([]);
  const [purchases,setPurchases] = useState([]);
  const [totalIncome,setTotalIncome] = useState([]);
  const [changeChart,setChangeChart] = useState(false)
  const [salesCancelled, setSalesCancelled] = useState([]); 

  const [endDates,setEndDates] = useState(new Date());
  const [startDates,setStartDates] = useState(new Date());
  const [dates,setDates] = useState({startDate:new Date("2023-01-01") ,endDate: new Date()});

  const { get } = useContext(APIContext);

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
    setStartDates(date.selection.startDate)
    setEndDates(date.selection.endDate)
    setDates(date.selection);
  };

  const selectionRange = {
    startDate: startDates,
    endDate: endDates,
    key: 'selection',
  }

  return (
    <>
      <div className="analyst-div">
        <div className="lineChart">
          <h2>{changeChart ? "Sales" : "Purchase"} evolution</h2>
          <h3>Change to: </h3>
          <Button 
            styles="area-button"
            buttonText={!changeChart ? "Sales" : "Purchase"} 
            buttonFunction={changeChartHandler} 
          />
          <LineCharts axes={changeChart ? extracSalesData() : extracPurchasestData() } title={changeChart ? "Sales" : "Purchase"} dates={dates}/>
        </div>
        <div>
          <DateRangePicker
            staticRanges={[]}
            inputRanges={[]}
            ranges={[selectionRange]}
            onChange={handleSelect}
          />
          <select>
            <option value="">Purchases</option>
            <option value="">Sales</option>
            <option value="">Sales/Purchases</option>
          </select>
        </div>
      </div>
      <div className="analyst-boxes">
          <div className="analyst-card">
            <BoxItem quantity={sales.length} title="Total completed Sales"  color="rgba(40, 205, 54, 0.738)" />
          </div>
          <div className="analyst-card">
            <BoxItem quantity={salesCancelled} title="Total cancelled Sales"  color="rgba(13, 13, 13, 0.699)" />
          </div>
          <div className="analyst-card">
            <BoxItem quantity={"$" + totalIncome} title="sales revenue"  color="rgba(0, 103, 199, 0.699)" />
          </div>
      </div>
      <br></br>
      <hr></hr>
      <div className="analyst-div">
        <div className="barChart">
          <h2>SALES vs PURCHAES</h2>
          <Bars values={{ sales: sales.length,purchases: purchases.length}}
          />
        </div>
      </div>
    </>
  );
};

export default ReportsArea;
