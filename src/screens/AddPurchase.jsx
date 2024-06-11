import { Button,StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Dropdown from '../components/Dropdown';
import SearchDropdown from '../components/SearchDropdown';
import firestore from '@react-native-firebase/firestore';
import DatePicker from '../components/DatePicker';
import { useNavigation } from '@react-navigation/native';
import DashBoard from './DashBoard';

const optionsUnit = [
    { label: 'pcs', value: '1' },
    { label: 'set', value: '2' },
    { label: 'dozen', value: '3' },
    // Add more options as needed
];

const AddPurchase = () => {

    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [Voucher, setVoucher] = useState();
    const [Party, setParty] = useState();
    const [Narration, setNarration] = useState();
    const [Item, setItem] = useState();
    const [Quantity, setQuantity] = useState('');
    const [Unit, setUnit] = useState();
    const [Price, setPrice] = useState('');
    const [Amount, setAmount] = useState('');
    const [partyOptions, setPartyOptions] = useState();
    const [itemOptions, setItemOptions] = useState();
    const [loader, setLoader] = useState(false);

    useEffect(() => {

        getCreditors();
        getItems();
    }, []);

    useEffect(() => {
        calculateAmount();
    }, [Quantity, Price]);

    const getCreditors = async () => {
        try {
            const snap = await firestore().collection("account").where("group", "==", "creditor").get();
            const data = snap.docs.map(doc => {
                const id = doc.id;
                const data = doc.data();
                return { label: data.name, value: id };
            });
            console.log(data);
            setPartyOptions(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getItems = async () => {
        try {
            const snap = await firestore().collection("item").get();
            const data = snap.docs.map(doc => {
                const id = doc.id;
                const data = doc.data();
                return { label: data.name, value: id };
            });
            console.log(data);
            setItemOptions(data);
        } catch (error) {
            console.log(error);
        }
    }

    const addCategory = async () => {
        try {
            await firestore().collection("purchase").add({
                date: date,
                voucher: Voucher,
                party: Party,
                narration: Narration,
                item: Item,
                quantity: Quantity,
                unit: Unit,
                price: Price,
                amount: Amount
            });
            setLoader(true);
            console.log("Document successfully written!");
            ToastAndroid.showWithGravity('Purchase Added Successfully...!', ToastAndroid.SHORT, ToastAndroid.TOP);
            setLoader(false);
        } catch (error) {
            setLoader(true);
            console.error("Error writing document: ", error);
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


    const handleSelect = (optionsUnit) => {
        setUnit(optionsUnit.label);
    };

    const handleSelect2 = (optionsItem) => {
        setItem(optionsItem.value);
    };

    const handleSelectParty = (optionsParty) => {
        setParty(optionsParty.value);
        console.log(optionsParty);
    };

    const calculateAmount = () => {
        const qty = parseFloat(Quantity);
        const prc = parseFloat(Price);
        if (!isNaN(qty) && !isNaN(prc)) {
            setAmount((qty * prc).toString());
        } else {
            setAmount('');
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={{ flex: 1, backgroundColor: colors.primary }}>
                    <Text style={styles.headingText}> Add Purchase</Text>
                    <Text style={styles.textStyle}>Date</Text>
                    <DatePicker setDate={setDate} date={date}></DatePicker>
                    <Text style={styles.textStyle}>Vch No.</Text>
                    <TextInput style={styles.box}
                        placeholder="Voucher No"
                        value={Voucher}
                        onChangeText={setVoucher}
                    ></TextInput>
                    <Text style={styles.textStyle}>Party </Text>
                    {partyOptions &&
                        <Dropdown options={partyOptions} onSelect={handleSelectParty} />
                    }
                    <Text style={styles.textStyle}>Narration</Text>
                    <TextInput style={styles.box}
                        placeholder="Bill and book no"
                        value={Narration}
                        onChangeText={setNarration}
                    ></TextInput>
                    <Text style={styles.textStyle}>Item</Text>
                    {itemOptions &&
                        <SearchDropdown options={itemOptions} onSelect={handleSelect2} />
                    }
                    <Text style={styles.textStyle}>Quantity</Text>
                    <TextInput style={styles.box}
                        placeholder="Enter Quantity"
                        value={Quantity}
                        onChangeText={setQuantity}
                        keyboardType="numeric"
                    ></TextInput>
                    <Text style={styles.textStyle}>Unit</Text>
                    <Dropdown options={optionsUnit} onSelect={handleSelect} />
                    <Text style={styles.textStyle}>Price</Text>
                    <TextInput style={styles.box}
                        placeholder="Enter Price"
                        value={Price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                    ></TextInput>
                    <Text style={styles.textStyle}>Amount</Text>
                    <TextInput style={styles.box}
                        placeholder="   "
                        value={Amount}
                        editable={false}
                    ></TextInput>
                    
                    <TouchableOpacity style={styles.button} disabled={loader} onPress={addCategory}>
                        {loader ? (<ActivityIndicator />) : (<Text style={styles.buttonText}>Save</Text>)}
                    </TouchableOpacity>
                    <Button
                        title="View Purchases"
                        onPress={() => navigation.navigate('PurchaseList')}
                    />



                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddPurchase

const styles = StyleSheet.create({
    semiCircle: {
        width: 420,
        height: 200,
        borderBottomLeftRadius: 220,
        borderBottomRightRadius: 220,
        backgroundColor: 'transparent', // Transparent background
        borderBottomWidth: 200, // Height of the semi-circle
        borderBottomColor: '#2E8B57', // Same color as the background
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
        elevation: 9, // for A
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
        color: 'white',
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
});
