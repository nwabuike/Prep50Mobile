import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'
import configureStore from './state/store'
import { initialiseApplication } from './state/actions/application.actions'
import Navigation from './components/routing'

const store = configureStore()
store.dispatch(initialiseApplication())
export default function App() {
  

  return (
    <Provider store={store}>
            <StatusBar hidden />
            <Navigation />
        </Provider>
  )
}
