import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import SearchDropdown from '../components/SearchDropdown';
import Dropdown from '../components/Dropdown';
import firestore from '@react-native-firebase/firestore'



const optionsGroup = [
    { label: 'Creditor', value: '1' },
    { label: 'Debitor', value: '2' },
    // Add more options as needed
];

const optionsUnit = [
    { label: 'pcs', value: '1' },
    { label: 'set', value: '2' },
    { label: 'dozen', value: '3' },

    // Add more options as needed
];

const AddItem = () => {
    const [Name, setName] = useState();
    const [Group, setGroup] = useState();
    const [Unit, setUnit] = useState();
    const [Quantity, setQuantity] = useState();
    const [SalePrice, setSalePrice] = useState();


    const addCategory = async () => {
        try {
            await firestore().collection("item").add({
               name: Name,
               unit:Unit,
               quantity:Quantity,
               salePrice:SalePrice
            });
            setName(''),
            setGroup(''),
            setUnit(''),
            setQuantity(''),
            setSalePrice('')

            console.log("Document successfully written!");
        } catch (error) {
            console.error("Error writing document: ", error);
        }
    };
    

    const handleSelect2 = (optionsGroup) => {
        setGroup(optionsGroup.label)
    };

    const handleSelect3 = (optionsUnit) => {
        setUnit(optionsUnit.label)
    };

    const print = () => {


        const itemData = {
            Name,
            Group,
            Unit,
            Quantity,
            SalePrice
        }
        console.log(itemData)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>

                <View style={{ flex: 1, backgroundColor: colors.primary }}>
                    <View style={styles.semiCircle}></View>

                    <Text style={styles.headingText}> Add Item </Text>

                    <Text style={styles.textStyle}>Name</Text>
                    <TextInput style={styles.box}
                        placeholder="Enter Name"
                        value={Name}
                        onChangeText={setName}
                    ></TextInput>


{/* 
                    <Text style={styles.textStyle}>Group</Text>
                    <Dropdown options={optionsGroup} onSelect={handleSelect2} /> */}



                    <Text style={styles.textStyle}>Unit</Text>
                    <Dropdown options={optionsUnit} onSelect={handleSelect3} />
                   

                    <Text style={styles.textStyle}>Stock (Qty)</Text>
                    <TextInput style={styles.box}
                        placeholder="Enter Quantity"
                        value={Quantity}
                        onChangeText={setQuantity}
                    ></TextInput>

                    <Text style={styles.textStyle}>Sales Price</Text>
                    <TextInput style={styles.box}
                        placeholder="Enter Price"
                        value={SalePrice}
                        onChangeText={setSalePrice}
                    ></TextInput>


                    <TouchableOpacity style={styles.button} onPress={addCategory}>
                        <Text style={styles.buttonText}>save</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default AddItem

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
        marginTop: 45,
        marginBottom: 40
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
        marginLeft: 120,
        marginBottom: 25
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
})