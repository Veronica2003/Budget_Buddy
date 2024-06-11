// DoughnutChart.js
import React, { useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import useDoughnutShadow from './useDoughnutShadow'; // Import the custom hook

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ transactions }) => {
  const chartRef = useRef(null);
  useDoughnutShadow(chartRef); // Use the custom hook

  const positiveTransactions = transactions.filter(t => t.price >= 0);
  const negativeTransactions = transactions.filter(t => t.price < 0);

  const positiveTotal = positiveTransactions.reduce((sum, t) => sum + t.price, 0);
  const negativeTotal = Math.abs(negativeTransactions.reduce((sum, t) => sum + t.price, 0));

  const data = {
    labels: ['Positive Transactions', 'Negative Transactions'],
    datasets: [
      {
        label: 'Transaction Amount',
        data: [positiveTotal, negativeTotal],
        backgroundColor: ['#09f1db', '#044b5d'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: '90%', // Adjust this value to control the thickness of the doughnut
  };

  return (
    <div>
      <h2>Transaction Summary</h2>
      <Doughnut ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
