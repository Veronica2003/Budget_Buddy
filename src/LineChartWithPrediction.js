import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import useTransactionPrediction from './useTransactionPrediction';
const LineChartWithPrediction = ({ transactions }) => {
<LineChartWithPrediction transactions={transactions} />
  
  const { prepareData, trainModel, predict } = useTransactionPrediction(transactions);
  const [predictedData, setPredictedData] = useState([]);

  useEffect(() => {
    const runPrediction = async () => {
      const { tensorDates, tensorPrices } = prepareData();
      const model = await trainModel(tensorDates, tensorPrices);

      // Predict the next 30 days
      const lastDate = new Date(Math.max(...transactions.map(t => new Date(t.datetime).getTime())));
      const futureDates = [];
      for (let i = 1; i <= 30; i++) {
        futureDates.push(lastDate.getTime() + i * 24 * 60 * 60 * 1000);
      }

      const predictions = await predict(model, futureDates);
      setPredictedData(predictions);
    };

    runPrediction();
  }, [transactions]);

  const actualData = transactions.map(t => ({ x: new Date(t.datetime), y: t.price }));
  const futureData = predictedData.map((price, index) => ({
    x: new Date(new Date(Math.max(...transactions.map(t => new Date(t.datetime).getTime()))).getTime() + (index + 1) * 24 * 60 * 60 * 1000),
    y: price
  }));

  const data = {
    datasets: [
      {
        label: 'Actual Transactions',
        data: actualData,
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Predicted Transactions',
        data: futureData,
        borderColor: 'red',
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChartWithPrediction;
