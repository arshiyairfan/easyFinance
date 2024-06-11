import { Button,StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import Dropdown from '../components/Dropdown';
import firestore from '@react-native-firebase/firestore';
import DatePicker from '../components/DatePicker';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';

const optionsDC = [
    { label: 'Credit', value: '1' },
    { label: 'Debit', value: '2' },
];

const AddPayment = () => {

    const navigation = useNavigation();

    const [date, setDate] = useState(new Date());
    const [voucher, setVoucher] = useState('');
    const [DC, setDC] = useState('');
    const [account, setAccount] = useState('');
    const [debit, setDebit] = useState('');
    const [credit, setCredit] = useState('');
    const [narration, setNarration] = useState('');
    const [accountOptions, setAccountOptions] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        getCreditors();
    }, []);

    const getCreditors = async () => {
        try {
            const snap = await firestore().collection("account").where("group", "==", "creditor").get();
            const data = snap.docs.map(doc => ({
                label: doc.data().name,
                value: doc.id
            }));
            setAccountOptions(data);
        } catch (error) {
            console.log(error);
        }
    }

    const addCategory = async () => {
        setLoader(true);
        try {
            await firestore().collection("Payment").add({
                date,
                voucher,
                DC,
                account,
                debit,
                credit,
                narration
            });
            setLoader(true);
            console.log("Document successfully written!");
            ToastAndroid.showWithGravity('Payment Added Successfully...!', ToastAndroid.SHORT, ToastAndroid.TOP);
            setLoader(false);

        } catch (error) {
            setLoader(true);
            console.error("Error writing document: ", error);
        } finally {
            setLoader(false);
        }
    };

    const getLedgerEntries = async () => {
        try {
            const purchaseSnap = await firestore().collection("Purchase").get();
            const paymentSnap = await firestore().collection("Payment").get();

            const purchases = purchaseSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const payments = paymentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            return { purchases, payments };
        } catch (error) {
            console.error("Error fetching ledger entries: ", error);
            throw error;
        }
    };

    const selectDC = (option) => {
        setDC(option.label);
    };

    const handleSelectAccount = (option) => {
        setAccount(option.value);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={{ flex: 1, backgroundColor: colors.primary }}>
                    <Text style={styles.headingText}> Add Payment</Text>

                    <Text style={styles.textStyle}>Date</Text>
                    <DatePicker setDate={setDate} date={date} />

                    <Text style={styles.textStyle}>Vch No.</Text>
                    <TextInput
                        style={styles.box}
                        placeholder="Enter Voucher No."
                        value={voucher}
                        onChangeText={setVoucher}
                    />

                    <Text style={styles.textStyle}>D/C</Text>
                    <Dropdown options={optionsDC} onSelect={selectDC} />

                    <Text style={styles.textStyle}>Account</Text>
                    {accountOptions.length > 0 && (
                        <Dropdown options={accountOptions} onSelect={handleSelectAccount} />
                    )}

                    <Text style={styles.textStyle}>Debit (Rs.)</Text>
                    <TextInput
                        style={styles.box}
                        placeholder="Enter Price"
                        value={debit}
                        onChangeText={setDebit}
                        keyboardType="numeric"
                    />

                    <Text style={styles.textStyle}>Credit (Rs.)</Text>
                    <TextInput
                        style={styles.box}
                        placeholder="Enter Price"
                        value={credit}
                        onChangeText={setCredit}
                        keyboardType="numeric"
                    />

                    <Text style={styles.textStyle}>Short Narrations</Text>
                    <TextInput
                        style={styles.box}
                        placeholder="Bill and Book no."
                        value={narration}
                        onChangeText={setNarration}
                    />

                    <TouchableOpacity style={styles.button} onPress={addCategory} disabled={loader}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <Button
                        title="View Ledger"
                        onPress={() => navigation.navigate('LedgerList')}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default AddPayment;

const styles = StyleSheet.create({
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
        elevation: 9,
        fontSize: 17,
        paddingLeft: 20
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
        elevation: 9,
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
    scrollViewContent: {
        flexGrow: 1,
    },
});
