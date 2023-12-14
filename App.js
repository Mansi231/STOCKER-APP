import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainStackNavigator from './src/navigation/navigation'
import ContextProvider from './src/context/ContextProvider';

const App = () => {

  console.log('')
  return (
    <ContextProvider>
      <MainStackNavigator />
    </ContextProvider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  }
})