import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { createAndTrainModel, fetchSalesData, preprocessData } from '../utils/ai';

const PredictionScreen = () => {
  const [prediction, setPrediction] = useState(null);

  const predictFutureSales = async () => {
    try {
        const salesData = await fetchSalesData();
        console.log('Fetched sales data:', salesData);
        
        const preprocessedData = preprocessData(salesData);
        console.log('Preprocessed data:', preprocessedData);
        
        const model = await createAndTrainModel(preprocessedData);
        console.log('Trained model:', model);

        if (model) {
          // Make a prediction for the next timestamp
          const nextDate = new Date().getTime(); // Example future date
          console.log('Next date (timestamp):', nextDate);
          
          const nextDateTensor = tf.tensor2d([[nextDate]], [1, 1]); // Ensure input is a 2D tensor
          console.log('Next date tensor:', nextDateTensor.print());

          const predictionTensor = model.predict(nextDateTensor);
          console.log('Prediction tensor:', predictionTensor.print());

          const predictionValue = predictionTensor.dataSync()[0];
          console.log('Predicted value:', predictionValue);

          setPrediction(predictionValue);
        } else {
          console.error('Model is null, prediction cannot be made.');
        }

    } catch (error) {
        console.error('Error in predictFutureSales:', error);
    }
  };

  useEffect(() => {
    predictFutureSales();
  }, []);

  return (
    <View>
      <Text>Future Sales Prediction</Text>
      {prediction !== null ? (
        <Text>{`Predicted Amount: ${prediction}`}</Text>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default PredictionScreen;
