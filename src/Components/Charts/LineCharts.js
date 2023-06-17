import { useCallback, useEffect, useState} from 'react';

import { Line } from 'react-chartjs-2';
import {
  Chart as chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler    
} from 'chart.js'

chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

var options = {
  scales : {
      y : {
          min : 0,
          ticks: { color: 'rgb(0, 0, 0)'}
      },
      x: {
        ticks: { color: 'rgb(0, 0, 0)'}
      }
  }
};

const salesData = [
    { date: '2023-01-01', purchase: 100 },
    { date: '2023-02-02', purchase: 150 },
    { date: '2023-03-03', purchase: 200 },
    { date: '2023-04-20', purchase: 300 },
    { date: '2023-05-01', purchase: 200 },
    { date: '2023-06-15', purchase: 220 },
    { date: '2023-07-03', purchase: 250 },
    { date: '2023-08-04', purchase: 280 },
    { date: '2023-09-05', purchase: 300 },
    { date: '2023-10-06', purchase: 310 },
    { date: '2023-11-02', purchase: 320 },
    { date: '2023-12-09', purchase: 350 },

];

const LineCharts = ({axes,title}) => {

  //const [chartData, setChartData] = useState([]);
  const [timeRange, setTimeRange] = useState('last3Months'); // Estado para almacenar el rango de tiempo seleccionado
  const [ axesX , setAxesX] = useState([])
  const [ axesY , setAxesY] = useState([])

  const filterChartData = () => {

    
    // Filtrar los últimos 3 meses
    let filterData = []
    const today = new Date();
    const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate());
    filterData = salesData.filter( item => new Date(item.date) >= threeMonthsAgo && new Date(item.date) <= today)

  
    //const labels = timeRange === 'last3Months' ? filterData.map((item) => item.date) : salesData.map((i)=> i.date);
    //const sales = timeRange === 'last3Months' ? filterData.map((item) => item.purchase) : salesData.map((i)=> i.purchase)

    return {
      labels: axesX,
      datasets: [
        {
          label: title,
          data: axesY,
          tension: 0.5,
          fill : true,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          pointRadius: 5,
          pointBorderColor: 'rgba(255, 99, 132)',
          pointBackgroundColor: 'rgba(255, 99, 132)',
        }
      ],
    };
  }

  const configureAxes = useCallback(() => {
    setAxesX((axes.dates).reverse())
    setAxesY((axes.quantity).reverse())
  },[axes])

  useEffect(()=>{
    configureAxes()
    console.log("loop")
  },[configureAxes])

  const handleTimeRangeChange = (event) => {
      setTimeRange(event.target.value);
      console.log("entro en handle")
  };    
  
  return (
      <div>
          <div>
          <label htmlFor="timeRange">Rango de tiempo:</label>
          <select id="timeRange" defaultValue={timeRange} onChange={handleTimeRangeChange}>
            <option value="all">Todos los tiempos</option>
            <option value="last3Months">Últimos 3 meses</option>
          </select>
        </div>
        <Line data={ filterChartData() } options={options} />
      </div>
  );
}

export default LineCharts
