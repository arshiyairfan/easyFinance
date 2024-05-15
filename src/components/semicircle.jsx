import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const semicircle = () => {
  return (
    <View>
      <View style={styles.semiCircle}> </View>
    </View>
  )
}

export default semicircle

const styles = StyleSheet.create({
    semiCircle: {
        width: 420,
        height: 200,
        borderBottomLeftRadius: 220,
        borderBottomRightRadius: 220,
        backgroundColor: 'transparent', // Transparent background
        borderBottomWidth: 200, // Height of the semi-circle
        borderBottomColor: colors.dark, // Same color as the background
        top: 0,
        shadowColor: '#00000',
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 10,
        marginBottom: 26

    },
})