import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from './src/constants/globalStyles'

const App = () => {
  return (
    <View style={styles.container}>
      <Text>App</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    backgroundColor:colors.light,
    flex:1
  }
})