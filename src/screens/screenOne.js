import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from './src/constants/globalStyles'


const screenOne = () => {
  return (
    <View style={styles.background}>
      
    </View>
  )
}

export default screenOne

const styles = StyleSheet.create({
    background: {
        backgroundColor:colors,
        height: 1000,
        width: 1000
      },

})