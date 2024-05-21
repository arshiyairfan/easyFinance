import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import colors from '../constants/globalStyles'
import { useNavigation } from '@react-navigation/native'
import Dropdown from '../components/Dropdown'


const options = [
    { label: 'Debitor', value: '1' },
    { label: 'Creditor', value: '2' },

];


const AddAccount = () => {
    const navigation = useNavigation();
    const [name, setName] = useState();
    const [group, setGroup] = useState();
    const navigate = () => {
        navigation.navigate("Add Item")
    }

    const handleSelect = (option) => {
        console.log('Selected option:', option);
    };

    const print = () => {
        const accountData = {
            name,
            group
        }
        console.log(accountData)
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.primary }}>
            <View style={styles.semiCircle}></View>
            <Text style={styles.headingText}>Add Account</Text>
            <Text style={styles.textStyle}>Name</Text>
            <TextInput style={styles.box}
                placeholder="Enter name"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.textStyle}>Group</Text>
            <Dropdown  options={options} onSelect={handleSelect} />

            <TouchableOpacity style={styles.button} onPress={print}>
                <Text style={styles.buttonText}>save</Text>
            </TouchableOpacity>

        </View>
    )
}

export default AddAccount

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

    box: {
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
    textStyle: {

        color: 'white',
        marginLeft: 40,
        padding: 8,
        fontWeight: 'bold',
        fontSize: 18

    },
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
        marginTop: 45
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        padding: 18,
        marginLeft: 120
    },
    headingText: {
        fontSize: 40,
        color: colors.light,
        fontWeight: 'bold',
        marginLeft: 90,
        marginBottom: 25
    },



})