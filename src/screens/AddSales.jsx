import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const AddSales = () => {

    const [Name,setName]=useState();
    const [Voucher,setVoucher]=useState();
    const [Party,setParty]=useState();
    const [Narration,setNarration]=useState();
    const [Item,setItem]=useState();
    const [Quantity,setQuantity]=useState();
    const [Unit,setUnit]=useState();
    const [Price,setPrice]=useState();
    const [Amount,setAmount]=useState();
    const print=()=>{
        const SalesData={
            Name,
            Voucher,
            Party,
            Narration,
            Item,
            Quantity,
            Unit,
            Price,
            Amount
        }
        console.log(SalesData)
    }

    return (

        <SafeAreaView style={{ flex: 1 }}>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>

                <View style={{ flex: 1, backgroundColor: colors.primary }}>
                   


                    <Text style={styles.headingText}> Add Sales</Text>

                    <Text style={styles.textStyle}>Date</Text>
                    <TextInput style={styles.box}
                        placeholder="Name"
                        value={Name}
                        onChangeText={setName}

                    ></TextInput>


                    <Text style={styles.textStyle}>Vch No.</Text>
                    <TextInput style={styles.box}

                        placeholder="Voucher No"
                        selection={{ start: 0, end: 0 }}
                        value={Voucher}
                        onChangeText={setVoucher}
                    ></TextInput>


                    <Text style={styles.textStyle}>Party </Text>
                    <TextInput style={styles.box}
                        placeholder="Party name"
                        value={Party}
                        onChangeText={setParty}
                    ></TextInput>

                    <Text style={styles.textStyle}>Narration</Text>
                    <TextInput style={styles.box}
                        placeholder="Bill and book no"
                       value={Narration}
                       onChangeText={setNarration}
                    ></TextInput>

                    <Text style={styles.textStyle}>Item</Text>
                    <TextInput style={styles.box}
                        placeholder="Item name"
                        value={Item}
                        onChangeText={setItem}
                    ></TextInput>

                    <Text style={styles.textStyle}>Quantity</Text>
                    <TextInput style={styles.box}
                        placeholder="Enter Quantity"
                        value={Quantity}
                        onChangeText={setQuantity}
                    ></TextInput>

                    <Text style={styles.textStyle}>Unit</Text>
                    <TextInput style={styles.box}
                        placeholder="Pcs/Set/Dozen"
                        value={Unit}
                        onChangeText={setUnit}
                    ></TextInput>

                    <Text style={styles.textStyle}>Price</Text>
                    <TextInput style={styles.box}
                        placeholder="Enter Price"
                        value={Price}
                        onChangeText={setPrice}
                    ></TextInput>

                    <Text style={styles.textStyle}>Amount</Text>
                    <TextInput style={styles.box}
                        placeholder="   "
                        value={Amount}
                        onChangeText={setAmount}
                    ></TextInput>




                    <TouchableOpacity style={styles.button} onPress={print}>
                        <Text style={styles.buttonText}>save</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddSales

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


    },

    box: {
        height: 60,
        width: 330,
        color: 'white',
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
        paddingLeft:20,
        fontSize:17

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
        color: colors.white,
        fontWeight: 'bold',
        marginLeft: 115,
        marginBottom: 20,
        marginTop: 35
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
    },

})