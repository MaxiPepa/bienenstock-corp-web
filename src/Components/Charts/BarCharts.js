import { optionsBarChart } from 'Assets/Constants';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

//AGREGAR A PROPS TITLE O LABEL
const Bars = ({values,label}) => {
    
    const data = {
        labels: ["Sales  -  Purchases"],
        datasets: [
            {
                label: 'sales',
                data: [values.sales],
                backgroundColor: 'rgba(0, 220, 195, 0.5)'
            },        
            {
                label: 'purchases',
                data: [values.purchases],
                backgroundColor: 'rgba(0, 2, 195, 0.5)'
            }
        ]
    };

    return (
        <>
            <Bar data={data} options={optionsBarChart} />
        </>
    )
}

export default Bars