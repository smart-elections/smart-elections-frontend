import React from 'react'
import { Chart as ChartJS, BarElement, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(
    BarElement, CategoryScale, LinearScale
);

function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}

const BarChart = ({ data }) => {
    let barChartData = {
        labels: data?.map(candidate => capitalize(candidate.citizen_firstname) + " " + capitalize(candidate.citizen_lastname)),
        datasets: [{
            label: 'Votes Percentage',
            data: data?.map(candidate => candidate.percentage),
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
    };

    let options = {
        maintainAspectRatio: false,
        scales: {
        },
        legend: {
            display: true,
            labels: {
                fontSize: 25,
            },
        }
    }

    return (
        <div>
            <Bar
                className='chart'
                data={barChartData}
                options={options}
                width={400}
                height={315}
            />
        </div >
    )
}

export default BarChart;
