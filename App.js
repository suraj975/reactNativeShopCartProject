import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigator from './navigator/mainNavigator';
import {Provider} from 'react-redux'
import {combineReducers,createStore } from 'redux'
import shopreducer from './store/reducer'

const rootreducer = combineReducers({shopreducer,});

const store = createStore(rootreducer)

function App() {
  return (
      <Provider store={store}>
      <MainNavigator />
      </Provider>
  );
}


export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
