import firestore from '@react-native-firebase/firestore';
import * as tf from '@tensorflow/tfjs';

export const fetchSalesData = async () => {
  const salesSnapshot = await firestore().collection('sales').get();
  const salesData = [];
  salesSnapshot.forEach(doc => {
    salesData.push(doc.data());
  });
  return salesData;
};

export const preprocessData = (salesData) => {
  const data = salesData.map(sale => {
    // Parse Firestore timestamp into a JavaScript Date object
    const dateObject = sale.date.toDate();
    // Get timestamp in milliseconds
    const timestamp = dateObject.getTime();
    return {
      date: timestamp,
      amount: parseFloat(sale.amount)
    };
  });

  return data;
};

export const createAndTrainModel = async (data) => {
  try {
    // Ensure data is not empty
    if (data.length === 0) {
      throw new Error('Data is empty');
    }

    // Extract inputs and labels from data
    const inputs = data.map(d => d.date);
    const labels = data.map(d => d.amount);

    // Check if inputs and labels have valid lengths
    if (inputs.length === 0 || labels.length === 0 || inputs.length !== labels.length) {
      throw new Error('Invalid data format');
    }

    // Convert inputs and labels to numeric arrays
    const numericInputs = inputs.map(input => [input]); // Ensure inputs are 2D arrays
    const numericLabels = labels.map(label => [label]);

    // Create tensors from numeric arrays
    const xs = tf.tensor2d(numericInputs);
    const ys = tf.tensor2d(numericLabels);

    // Log tensors to check their validity
    console.log('xs:', xs.print());
    console.log('ys:', ys.print());

    // Create a simple model
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 50, inputShape: [1] }));
    model.add(tf.layers.dense({ units: 50 }));
    model.add(tf.layers.dense({ units: 1 }));

    model.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError'
    });

    await model.fit(xs, ys, { epochs: 50 });

    return model;

  } catch (error) {
    console.log(error);
    return null; // Return null if an error occurs
  }
};
