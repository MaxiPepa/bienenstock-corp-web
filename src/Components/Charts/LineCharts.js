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

const datos =  {
  labels: ["Enero","febrero","marzo"],
  datasets: [
    {
      label: "Prueba",
      data: [2,3,5],
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


const LineCharts = ({axes,title,dates}) => {

  const [filterDate,setFilterDate] = useState([]);
  const [values,setValues] = useState([]); 
  
  const filterChartData = () => {

    let filter = []
    const startDate = new Date(
      filterDate.length === 0 ? new Date().getFullYear().toString() : filterDate.startDate.getFullYear().toString(),
      filterDate.length === 0 ? new Date().getMonth() : filterDate.startDate.getMonth(),
      filterDate.length === 0 ? new Date().getDate() : filterDate.startDate.getDate()
    );

    console.log("ingreso en filter data:" +startDate)
  
    const endDate = new Date(filterDate.length === 0? 
      ( new Date().getFullYear(), new Date().getMonth(), new Date().getDate()):
      ( filterDate.endDate.getFullYear(),filterDate.endDate.getMonth(),filterDate.endDate.getDate())
    );
  
    filter = values.filter( item => new Date(item.date) >= startDate && new Date(item.date) <= endDate) 
  
    const labels = filterDate.length === 0 ? values.map((i)=> i.date) : filter.map((i) => i.date) ;
    const quantity = filterDate.length === 0 ? values.map((i)=> i.quantity) : filter.map((i) => i.quantity)
  
    return {
      labels: labels.reverse(),
      datasets: [
        {
          label: title,
          data: quantity.reverse(),
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

  //console.log(filterChartData())
  
  const configureAxes = useCallback(() => {
    setValues( axes.dates.map((e,i)=>{
      return {
        date: e,
        quantity:axes.quantity[i] 
      } 
    }))
    setFilterDate(dates)
    console.log(dates)
  },[axes,dates])
  
  useEffect(()=>{
    configureAxes()
    console.log("loop")
  },[configureAxes])


  return (
    <div>
      <Line data={datos } options={options} />
    </div>
  );
}

export default LineCharts
