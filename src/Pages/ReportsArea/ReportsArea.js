import { useContext, useCallback, useEffect, useState } from "react";

import { DateRangePicker } from "react-date-range";

import { Button, LineCharts, Bars, Table, ParametersSection } from "Components";
import { APIContext } from "Contexts";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./ReportsArea.css";

const ReportsArea = () => {

  const [state, setState] = useState({
    cancelledPurchases: 0, 
    cancelledSales: 0,
    products: [],
    purchases: [],
    sales: [],
    totalPurchaseIncome: 0,
    totalSaleIncome: 0,
  });
  const [changeChart, setChangeChart] = useState(false);
  const [changeParameters, setChangeParameters] = useState(true);
  const [dates, setDates] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
    endDate: new Date(),
    key: "selection",
  });

  const { get } = useContext(APIContext);
    

  const groupData = (data) => {
    
    const result = [];
    
    // Crear un mapa para almacenar las fechas y las cantidades acumuladas
    const map = new Map();
    data.forEach(item => {
      const { date, quantity } = item;
      if (map.has(date)) {
        map.set(date, map.get(date) + quantity);
      } else {
        map.set(date, quantity);
      }
    });
    
    // Convertir el mapa en un arreglo de objetos con las fechas y las cantidades acumuladas
    map.forEach((quantity, date) => {
      result.push({ date, quantity });
    });
    
    // Ordenar el arreglo por fecha de forma ascendente
    result.sort((a, b) => a.date.localeCompare(b.date));
    
    return result;
    
  }


  const getStatistics = useCallback(()=>{
    get("report/getStatistics").then((data)=>{
      setState({
        cancelledPurchases: data.cancelledPurchases, 
        cancelledSales: data.cancelledSales,
        products: data.products,
        purchases: groupData(data.purchases),
        sales: groupData(data.sales),
        totalPurchaseIncome: data.totalPurchaseIncome,
        totalSaleIncome: data.totalSaleIncome,
      })
    })
  },[get])

  useEffect(() => {
    getStatistics();
  }, [getStatistics]);

  const extractPurchasestData = () => {
    const dates = state.purchases.map(x => x.date );
    const quantity = state.purchases.map(x => x.quantity);
    return { dates, quantity };
  };

  const extractSalesData = () => {
    const dates = state.sales.map(x => x.date );
    const quantity = state.sales.map(x => x.quantity);
    return { dates, quantity };
  };

  const handleSelect = (date) => {
    setDates(date.selection);
  };

  const parameters = {
    sales: {
      total: state.sales.length,
      cancelled: state.cancelledSales,
      income: state.totalSaleIncome,
    },
    purchases: {
      total: state.purchases.length,
      cancelled: state.cancelledPurchases,
      income: state.totalPurchaseIncome,
    },
  };

  return (
    <div className="area-container">
      <div className="area-header">
        <h2 className="area-title">Reports Area</h2>
      </div>
      <div className="buttons-box">
        {changeParameters && (
          <Button
            styles="area-button"
            buttonText={!changeChart ? "Sales" : "Purchase"}
            buttonFunction={()=>setChangeChart(!changeChart)}
          />
        )}
        <Button
          styles="area-button"
          buttonText={changeParameters ? "Other parameters" : "Go back"}
          buttonFunction={() => setChangeParameters(!changeParameters)}
        />
      </div>
      {changeParameters ? (
        <div className="charts-container">
          <h2 className="area-subtitle">
            {changeChart ? "Sales" : "Purchase"} evolution (time / units)
          </h2>
          <div className="chart-section">
            <div className="chart">
              <LineCharts
                axes={
                  changeChart ? extractSalesData() : extractPurchasestData()
                }
                title={"Products"}
                colorPicker={changeChart}
                dates={dates}
              />
            </div>
            <div className="calendar-container">
              <DateRangePicker
                staticRanges={[]}
                inputRanges={[]}
                ranges={[dates]}
                onChange={handleSelect}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="analytics-container">
          <h2 className="area-subtitle">Sales/Purchases analytics</h2>
          <div className="analytics">
            <div className="chart-container">
              <div className="barChart">
                <Bars
                  values={{ sales: parameters.sales.total, purchases: parameters.purchases.total }}
                />
                <h4>Sales vs Purchases</h4>
              </div>
            </div>
            <div className="analytics-section">
              <ParametersSection parameters={parameters} />
              <h4>Most selled products</h4>
              <Table
                content={state.products}
                thead={["Product name", "Quantity"]}
                mapKeys={["name", "quantity"]}
                entity="products"
                tableId={"reports-table"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsArea;
