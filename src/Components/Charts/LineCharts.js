import { useCallback, useEffect, useState } from "react";
import { optionsLineChart } from "Assets/Constants";

import { Line } from "react-chartjs-2";
import {
  Chart as chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineCharts = ({ axes, title, dates }) => {
  const [filterDate, setFilterDate] = useState(dates);
  const [values, setValues] = useState([]);

  const filterChartData = () => {
    let filter = [];
    const startDate = new Date(
      filterDate.startDate.getFullYear().toString(),
      filterDate.startDate.getMonth(),
      filterDate.startDate.getDate()
    );

    const endDate = new Date(
      filterDate.endDate.getFullYear(),
      filterDate.endDate.getMonth(),
      filterDate.endDate.getDate()
    );

    filter = values.filter(
      (item) =>
        new Date(item.date) >= startDate && new Date(item.date) <= endDate
    );

    const labels = filter.map((i) => i.date);
    const quantity = filter.map((i) => i.quantity);

    return {
      labels: labels.reverse(),
      datasets: [
        {
          label: title,
          data: quantity.reverse(),
          tension: 0.5,
          fill: true,
          borderColor:
            title === "Sales" ? "rgba(0, 220, 195, 0.5)" : "rgb(255, 99, 132)",
          backgroundColor:
            title === "Sales"
              ? "rgba(0, 220, 195, 0.5)"
              : "rgb(255, 99, 132,0.5)",
          pointRadius: 5,
          pointBorderColor:
            title === "Sales" ? "rgba(0, 220, 195, 0.5)" : "rgb(255, 99, 132)",
          pointBackgroundColor:
            title === "Sales" ? "rgba(0, 220, 195, 0.5)" : "rgb(255, 99, 132)",
        },
      ],
    };
  };

  const configureAxes = useCallback(() => {
    setValues(
      axes.dates.map((e, i) => {
        return {
          date: e,
          quantity: axes.quantity[i],
        };
      })
    );
    setFilterDate(dates);
  }, [axes, dates]);

  useEffect(() => {
    configureAxes();
  }, [configureAxes]);

  return (
    <div>
      <Line data={filterChartData()} options={optionsLineChart} />
    </div>
  );
};

export default LineCharts;
