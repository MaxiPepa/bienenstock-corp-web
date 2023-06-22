import { useContext,useCallback,useEffect,useState } from "react";
import { Button, LineCharts, Bars,BoxParameters,Table} from "Components";
import { ArrowCircleUpIcon,ArrowCircleDownIcon, RemoveShoppingCartRoundedIcon, ShoppingCartRoundedIcon, ReceiptRoundedIcon, PriceCheckIcon } from "Assets/Icons";
import { DateRangePicker } from 'react-date-range';

import { APIContext } from "Contexts";
import { useTopSales } from "../../Hooks/AnalystHooks/useTopSales"


import  "./ReportsArea.css";
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

const ReportsArea = () => {

  const [sales,setSales] = useState([]);
  const [purchases,setPurchases] = useState([]);
  const [changeChart,setChangeChart] = useState(false)
  const [salesCancelled, setSalesCancelled] = useState([]); 
  const [totalIncomeSales,setTotalIncomeSales] = useState([]);
  const [changeParameters,setChangeParameters] = useState(true);
  const [purchasesCancelled,setPurchasesCancelled] = useState([]);
  const [totalIncomePurchases,setTotalIncomePurchases] = useState([]);

  const [endDates,setEndDates] = useState(new Date());
  const [startDates,setStartDates] = useState(new Date());
  const [dates,setDates] = useState({startDate:new Date("2023-01-01") ,endDate: new Date()});
  
  const { mostSelledProducts } = useTopSales();

  const { get } = useContext(APIContext);

  const getSales = useCallback(()=>{
    get("sale/getSales").then((data) => {
      setSalesCancelled(data.sales.filter((r)=>r.cancelled === true).length)
      setSales(data.sales.filter((r)=> r.dispatched === true ))
      setTotalIncomeSales(data.sales.reduce((sum, obj) => sum + obj.totalPrice, 0));
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
      setPurchasesCancelled(data.purchases.filter((r)=>r.cancelled === true).length)
      setTotalIncomePurchases(data.purchases.reduce((sum, obj) => sum + obj.totalPrice, 0));
    });
  },[get]);

  useEffect(() => {
    getPurchases();
    getSales()
  }, [getPurchases,getSales]);

  const changeChartHandler = () => {
    changeChart? setChangeChart(false) : setChangeChart(true) 
  }

  const changeParameterstHandler = () => {
    changeParameters? setChangeParameters(false) : setChangeParameters(true) 
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
      <div className="buttons-box">
        <Button 
          styles="area-button"
          buttonText={!changeChart ? "Sales" : "Purchase"} 
          buttonFunction={changeParameters?changeChartHandler:null} 
        />
        <Button 
          styles="area-button"
          buttonText={changeParameters?"other parameters": "back"} 
          buttonFunction={changeParameterstHandler} 
        />
      </div>
      { changeParameters?
      <div className="analyst-div">
        <div className="lineChart">
          <h2>{changeChart ? "Sales" : "Purchase"} evolution (time / units)</h2>
          <LineCharts axes={changeChart ? extracSalesData() : extracPurchasestData() } title={changeChart ? "Sales" : "Purchase"} dates={dates}/>
        </div>
        <div>
          <DateRangePicker
            staticRanges={[]}
            inputRanges={[]}
            ranges={[selectionRange]}
            onChange={handleSelect}
          />
        </div>
      </div> :
      <div className="analyst-div-2">
        <div className="barChart">
          <h4>Sales vs Purchases</h4>
          <Bars values={{ sales: sales.length,purchases: purchases.length}}/>
        </div>
        <div>
          <h4>Most selled products</h4>
          <Table         
            content={mostSelledProducts(sales).map((u) => u)}
            thead={[
              "Product name",
              "Quantity"            
            ]}
            mapKeys={["name","quantity"]}
            entity="products"
            tableId={"pending-products-table"}
          />
        </div>
        <div>
          <div className="content-boxes">
              <h4>Sales parameters</h4>
              <div className="analyst-boxes">
                <div className="analyst-card">
                  <BoxParameters quantity={sales.length} title="Total completed Sales" color="40, 205, 54" icon={<PriceCheckIcon/>}/>
                </div>
                <div className="analyst-card">
                  <BoxParameters quantity={salesCancelled} title="Total cancelled Sales"  color="255, 156, 0" icon={<ReceiptRoundedIcon/>}/>
                </div>
                <div className="analyst-card">
                  <BoxParameters quantity={"$" + totalIncomeSales} title="sales revenue"  color="0, 103, 199" icon={<ArrowCircleUpIcon/>} />
                </div>
              </div>
          </div>
          <div className="content-boxes">
              <h4>Purchases parameters</h4>
              <div className="analyst-boxes">
                <div className="analyst-card">
                  <BoxParameters quantity={purchases.length} title="Total completed purchases" color="40, 205, 54" icon={<ShoppingCartRoundedIcon/>}/>
                </div>
                <div className="analyst-card">
                  <BoxParameters quantity={purchasesCancelled} title="Total cancelled purchases"  color="255, 156, 0" icon={<RemoveShoppingCartRoundedIcon/>} />
                </div>
                <div className="analyst-card">
                  <BoxParameters quantity={"$" + totalIncomePurchases} title="Purchases revenue"  color="0, 103, 199" icon={<ArrowCircleDownIcon/>}/>
                </div>
              </div>
          </div>
        </div>
      </div>
      }
    </>
  );
};

export default ReportsArea;
