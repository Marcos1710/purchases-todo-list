import React from 'react'
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./src/store";
import ToDoList from './src/screens/ToDoList';

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <View >
        <ToDoList />
        <StatusBar style="auto" />
      </View>
    </PersistGate>
  </Provider>
)
    
export default App;