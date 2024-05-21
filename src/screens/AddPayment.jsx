import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Dropdown from '../components/Dropdown';


const optionsDC = [
    { label: 'Credit', value: '1' },
    { label: 'Debit', value: '2' },
    // Add more options as needed
];

const names = [
    { label: 'jahanzaib', value: '1' },
    { label: 'arshia', value: '2' },
    { label: 'muqeet', value: '2' },
    { label: 'ali', value: '2' },
    { label: 'haiser', value: '2' },
];

const AddPayment = () => {
    const [name,setName]=useState();
    const [voucher,setVoucher]=useState();
    const [DC,setDC]=useState();
    const [Account,setAccount]=useState();
    const [Debit,setDebit]=useState();
    const [Credit,setCredit]=useState();
    const [Narration,setNarration]=useState();
    
    const print=()=>{
        const data={
            name,
            voucher,
            DC,
            Account,
            Debit,
            Credit,
            Narration
        }
        console.log(data)
    }

    const Select = (option) => {
        setDC(option.label)
    };
    

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>

                <View style={{ flex: 1, backgroundColor: colors.primary }}>
                    
                    

                    <Text style={styles.headingText}> Add Payment</Text>

                    <Text style={styles.textStyle}>Date</Text>
                    <TextInput style={styles.box}
                        placeholder="Enter Date"
                        value={name}
                        onChangeText={setName}
                    ></TextInput>


                    <Text style={styles.textStyle}>Vch No.</Text>
                    <TextInput style={styles.box}

                        placeholder="Enter Voucher No."
                        value={voucher}
                        onChangeText={setVoucher}

                    ></TextInput>


                    <Text style={styles.textStyle}>D/C</Text>
                    <Dropdown options={optionsDC} onSelect={Select}
                    
                    />
                    

                    <Text style={styles.textStyle}>Account</Text>
                    <TextInput style={styles.box}
                        placeholder="Account"
                        value={Account}
                        onChangeText={setAccount}
                    ></TextInput>

                    <Text style={styles.textStyle}>Debit (Rs.)</Text>
                    <TextInput style={styles.box}
                        placeholder="Enter Price"
                        value={Debit}
                        onChangeText={setDebit}
                    ></TextInput>

                    <Text style={styles.textStyle}>Credit (Rs.)</Text>
                    <TextInput style={styles.box}
                        placeholder=" Enter Price"
                        value={Credit}
                        onChangeText={setCredit}
                    ></TextInput>

                    <Text style={styles.textStyle}>Short Narrations</Text>
                    <TextInput style={styles.box}
                        placeholder=" Bill and Book no."
                        value={Narration}
                        onChangeText={setNarration}
                    ></TextInput>


                    <TouchableOpacity style={styles.button} onPress={print}>
                        <Text style={styles.buttonText}>save</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddPayment

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
        fontSize: 17,
        paddingLeft:20
        
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
        marginLeft: 95,
        marginBottom: 25,
        marginTop:50
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
})