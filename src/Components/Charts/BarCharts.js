import { useState,useEffect,useCallback } from 'react';
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

const label = ["Sales  -  Purchases"];
var beneficios = [72];



const Bars = ({values}) => {
    
    const [bars,setBars] = useState([]);
    
    const options = {
        responsive : true,
        animation : true,
        plugins : {
            legend : {display : false}
        },
        scales : {
            y : {max : 100},
            x: {ticks: { color: 'rgba(0, 220, 195)'}}
        }
    };

    const data = {
        labels: label,
        datasets: [
            {
                label: 'sales',
                data: [bars.sales],
                backgroundColor: 'rgba(0, 220, 195, 0.5)'
            },        
            {
                label: 'purchases',
                data: [bars.purchases],
                backgroundColor: 'rgba(0, 2, 195, 0.5)'
            }

        ]
    };
    const valuesChart = useCallback(()=>{
        setBars(values);
    },[setBars])
    
    useEffect(()=>{
        valuesChart()
    },[valuesChart])

    return (
        <>
            <Bar data={data} options={options} />
        </>
    )
}

export default Bars