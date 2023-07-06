import { optionsLineChart } from 'Assets/Constants';

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

const LineCharts = ({axes,title,dates,colorPicker}) => {
  const filterChartData = () => {
    let filter = []
  
    filter = axes.dates.map( (item,index) => {
      if (new Date(item) >= dates.startDate && new Date(item) <= dates.endDate ){
        return index;
      }
    }) 

    const labels = axes.dates.filter((x,index) => filter.includes(index)) ;
    const quantity = axes.quantity.filter((x,index) => filter.includes(index));
  
    return {
      labels: labels,
      datasets: [
        {
          label: title,
          data: quantity,
          tension: 0.5,
          fill : true,
          borderColor: colorPicker ? 'rgba(0, 220, 195, 0.5)':'rgb(255, 99, 132)',
          backgroundColor: colorPicker ? 'rgba(0, 220, 195, 0.5)':'rgb(255, 99, 132,0.5)',
          pointRadius: 5,
          pointBorderColor: colorPicker ? 'rgba(0, 220, 195, 0.5)':'rgb(255, 99, 132)',
          pointBackgroundColor: colorPicker ? 'rgba(0, 220, 195, 0.5)':'rgb(255, 99, 132)',
        }
      ],
    };
  }

  return (
    <div>
      <Line data={filterChartData()} options={optionsLineChart} />
    </div>
  );
}

export default LineCharts
