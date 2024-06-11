
import colors from '../constants/globalStyles'
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import React from 'react'

const DashBoard = () => {
    const navigation = useNavigation();
    const navigate = (ScreenName) => {
        navigation.navigate(ScreenName)
    }


    return (
        <View style={{ flex: 1, backgroundColor: colors.primary,alignItems:"center" }}>

            <Text style={styles.headingText}> DashBoard</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigate("Add Account")}>
                <Text style={styles.buttonText}>Add Account</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigate("Add Item")}>
                <Text style={styles.buttonText}>Add Item</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigate("Add Payment")}>
                <Text style={styles.buttonText}>Add Payment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigate("Add Receipt")}>
                <Text style={styles.buttonText}>Add Receipt </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigate("Add Purchase")}>
                <Text style={styles.buttonText}>Add Purchase </Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.button} onPress={() => navigate("Add Sales")}>
                <Text style={styles.buttonText}>Add Sales</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigate("Prediction")}>
                <Text style={styles.buttonText}>Prediction</Text>
            </TouchableOpacity>

  




        </View>
    )
}

export default DashBoard

const styles = StyleSheet.create({


    button: {
        height: 60,
        width: 330,
        backgroundColor: colors.secondary,
        marginLeft: 40,
        marginRight: 60,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 9, // for Android
        marginTop: 45,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        padding: 18,
        textAlign:"center"
    },
    headingText: {
        fontSize: 40,
        color: colors.light,
        fontWeight: 'bold',
      
        marginTop:35,
        textAlign:'center'
    }


})