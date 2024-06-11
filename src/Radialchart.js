// RadialChart.js
import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const RadialChart = ({ transactions }) => {
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
        backgroundColor: ['#4caf50', '#f44336'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Transaction Summary</h2>
      <PolarArea data={data} />
    </div>
  );
};

export default RadialChart;
