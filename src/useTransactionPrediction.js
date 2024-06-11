// useTransactionPrediction.js
import * as tf from '@tensorflow/tfjs';

const useTransactionPrediction = (transactions) => {
  const prepareData = () => {
    const dates = transactions.map(t => new Date(t.datetime).getTime());
    const prices = transactions.map(t => t.price);

    const tensorDates = tf.tensor2d(dates, [dates.length, 1]);
    const tensorPrices = tf.tensor2d(prices, [prices.length, 1]);

    return { tensorDates, tensorPrices };
  };

  const trainModel = async (tensorDates, tensorPrices) => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

    await model.fit(tensorDates, tensorPrices, { epochs: 50 });

    return model;
  };

  const predict = async (model, futureDates) => {
    const tensorFutureDates = tf.tensor2d(futureDates, [futureDates.length, 1]);
    const predictions = model.predict(tensorFutureDates);

    return predictions.dataSync();
  };

  return { prepareData, trainModel, predict };
};

export default useTransactionPrediction;
