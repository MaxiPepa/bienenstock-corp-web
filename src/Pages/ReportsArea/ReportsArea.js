import { useContext, useCallback, useEffect, useState } from "react";

import { DateRangePicker } from "react-date-range";
import { useTopSales } from "Hooks";

import { Button, LineCharts, Bars, Table, ParametersSection } from "Components";
import { APIContext } from "Contexts";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./ReportsArea.css";

const ReportsArea = () => {
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [changeChart, setChangeChart] = useState(false);
  const [salesCancelled, setSalesCancelled] = useState([]);
  const [totalIncomeSales, setTotalIncomeSales] = useState([]);
  const [changeParameters, setChangeParameters] = useState(true);
  const [purchasesCancelled, setPurchasesCancelled] = useState([]);
  const [totalIncomePurchases, setTotalIncomePurchases] = useState([]);

  const [endDates, setEndDates] = useState(new Date());
  const [startDates, setStartDates] = useState(new Date());
  const [dates, setDates] = useState({
    startDate: new Date("2023-01-01"),
    endDate: new Date(),
  });

  const { mostSelledProducts } = useTopSales();

  const { get } = useContext(APIContext);

  const getSales = useCallback(() => {
    get("sale/getSales").then((data) => {
      setSalesCancelled(data.sales.filter((r) => r.cancelled === true).length);
      setSales(data.sales.filter((r) => r.dispatched === true));
      setTotalIncomeSales(
        data.sales.reduce((sum, obj) => sum + obj.totalPrice, 0)
      );
    });
  }, [get]);

  const getPurchases = useCallback(() => {
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
          })),
        }))
      );
      setPurchasesCancelled(
        data.purchases.filter((r) => r.cancelled === true).length
      );
      setTotalIncomePurchases(
        data.purchases.reduce((sum, obj) => sum + obj.totalPrice, 0)
      );
    });
  }, [get]);

  useEffect(() => {
    getPurchases();
    getSales();
  }, [getPurchases, getSales]);

  const changeChartHandler = () => {
    changeChart ? setChangeChart(false) : setChangeChart(true);
  };

  const changeParameterstHandler = () => {
    changeParameters ? setChangeParameters(false) : setChangeParameters(true);
  };

  const extracPurchasestData = () => {
    const dates = purchases.map((x) => {
      const date = new Date(x.date);
      const formattedDate = date.toISOString().split("T")[0];
      return formattedDate;
    });

    const quantity = purchases.map((obj) =>
      obj.products.reduce((acc, product) => acc + product.quantity, 0)
    );

    return { dates, quantity };
  };

  const extracSalesData = () => {
    const dates = sales.map((x) => {
      const date = new Date(x.date);
      const formattedDate = date.toISOString().split("T")[0];
      return formattedDate;
    });

    const quantity = sales.map((obj) =>
      obj.products.reduce((total, product) => total + product.quantity, 0)
    );

    return { dates, quantity };
  };

  const handleSelect = (date) => {
    setStartDates(date.selection.startDate);
    setEndDates(date.selection.endDate);
    setDates(date.selection);
  };

  const selectionRange = {
    startDate: startDates,
    endDate: endDates,
    key: "selection",
  };

  const parameters = {
    sales: {
      total: sales.length,
      cancelled: salesCancelled,
      income: totalIncomeSales,
    },
    purchases: {
      total: purchases.length,
      cancelled: purchasesCancelled,
      income: totalIncomePurchases,
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
            buttonFunction={changeParameters ? changeChartHandler : null}
          />
        )}
        <Button
          styles="area-button"
          buttonText={changeParameters ? "Other parameters" : "Go back"}
          buttonFunction={changeParameterstHandler}
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
                axes={changeChart ? extracSalesData() : extracPurchasestData()}
                title={changeChart ? "Sales" : "Purchase"}
                dates={dates}
              />
            </div>
            <div className="calendar-container">
              <DateRangePicker
                staticRanges={[]}
                inputRanges={[]}
                ranges={[selectionRange]}
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
                  values={{ sales: sales.length, purchases: purchases.length }}
                />
                <h4>Sales vs Purchases</h4>
              </div>
            </div>
            <div className="analytics-section">
              <ParametersSection parameters={parameters} />

              <h4>Most selled products</h4>
              <Table
                content={mostSelledProducts(sales).map((u) => u)}
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
