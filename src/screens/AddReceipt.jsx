import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'




const AddReceipt = () => {


    const [Date, setDate] = useState();
const [Voucher, setVoucher] = useState();
const [DC, setDC] = useState();
const [Account, setAccount] = useState();
const [Debit, setDebit] = useState();
const [Credit, setCredit] = useState();
const [Narration, setNarration] = useState();


const print = () => {
    const ReceiptData = {

        Date,
        Voucher,
        DC,
        Account,
        Debit,
        Credit,
        Narration
    }
    console.log(ReceiptData)
}

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>

                <View style={{ flex: 1, backgroundColor: colors.primary }}>


                    <Text style={styles.headingText}> Add Receipt</Text>

                    <Text style={styles.textStyle}>Date</Text>
                    <TextInput style={styles.box}
                        placeholder="Date"
                        value={Date}
                        onChangeText={setDate}

                    ></TextInput>


                    <Text style={styles.textStyle}>Vch no.</Text>
                    <TextInput style={styles.box}
                        placeholder="Enter Voucher no."
                        selection={{ start: 0, end: 0 }}
                        value={Voucher}
                        onChangeText={setVoucher}

                    ></TextInput>


                    <Text style={styles.textStyle}>D/C</Text>
                    <TextInput style={styles.box}
                        placeholder="Debit/Credit"
                        value={DC}
                        onChangeText={setDC}

                    ></TextInput>

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
                        placeholder="Enter Price"
                        value={Credit}
                        onChangeText={setCredit}

                    ></TextInput>

                    <Text style={styles.textStyle}>Short Narrations</Text>
                    <TextInput style={styles.box}
                        placeholder="Bill and book no"
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

export default AddReceipt

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
        marginLeft: 95,
        marginBottom: 25,
        marginTop: 50
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
})