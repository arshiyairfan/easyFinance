import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddAccount from './src/screens/AddAccount';
import AddItem from './src/screens/AddItem';
import AddReceipt from './src/screens/AddReceipt';
import AddSales from './src/screens/AddSales';
import AddPayment from './src/screens/AddPayment';
import DashBoard from './src/screens/DashBoard';
import AddPurchase from './src/screens/AddPurchase';
import PredictionScreen from './src/screens/Prediction';
import PurchaseList from './src/screens/PurchaseList';
import LedgerList from './src/screens/LedgerList';
import SalesList from './src/screens/SalesList';
import ReceiptList from './src/screens/ReceiptList';

const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="DashBoard" component={DashBoard} />
        <Stack.Screen name="Add Account" component={AddAccount} />
        <Stack.Screen name="Add Item" component={AddItem} />
        <Stack.Screen name="Add Receipt" component={AddReceipt} />
        <Stack.Screen name="Add Sales" component={AddSales} />
        <Stack.Screen name="Add Payment" component={AddPayment} />
        <Stack.Screen name="Add Purchase" component={AddPurchase}/>
        <Stack.Screen name="Prediction" component={PredictionScreen}/>
        <Stack.Screen name="PurchaseList" component={PurchaseList} /> 
        <Stack.Screen name="LedgerList" component={LedgerList} />
        <Stack.Screen name="SalesList" component={SalesList}/>
        <Stack.Screen name="ReceiptList" component={ReceiptList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
