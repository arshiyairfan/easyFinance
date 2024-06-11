import React, { useState } from 'react'
import { Button, StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native'
import DatePicker from 'react-native-date-picker'


export default ({date,setDate}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
        <View style={styles.buttonContent}>

          <Text style={styles.buttonText}> Select Date </Text>
        </View>
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={date}
        mode='date'
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}
const styles = StyleSheet.create({

  button: {
    height: 60,
    width: 330,
    color: "#4D6366",
    marginLeft: 40,
    marginRight: 60,
    backgroundColor: colors.dark,
    borderRadius: 19,
    shadowColor: '#000000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 9, // for Android,
    fontSize: 15,
    paddingLeft: 20,
    fontSize: 17
  },
  buttonText: {
    color: 'white',
    marginRight: 40,
    padding: 16,
    fontWeight: 'bold',
    fontSize: 18
  },
  buttonContent: {
    flexDirection: 'row', // Align text horizontally
    alignItems: 'center', // Align text vertically
    justifyContent: 'center',

  },
  buttonText2: {
    color: '#000',
    fontSize: 20,
    fontWeight: "bold"
  },
  smallText: {
    color: '#000',
    fontSize: 14, // Adjust the font size for small text
    marginLeft: 5, // Add some space between the button text and small text
  },
  icon: {
    width: 20, // Adjust the width of the icon
    height: 20, // Adjust the height of the icon
    marginRight: 5, // Add some space between the icon and text
  },

})