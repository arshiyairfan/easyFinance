import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const PurchaseList = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const snap = await firestore().collection('purchase').get();
                const data = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPurchases(data);
            } catch (error) {
                console.error("Error fetching purchase data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchases();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Date</Text>
                <Text style={styles.tableHeaderText}>Voucher</Text>
                <Text style={styles.tableHeaderText}>Party</Text>
                <Text style={styles.tableHeaderText}>Narration</Text>
                <Text style={styles.tableHeaderText}>Item</Text>
                <Text style={styles.tableHeaderText}>Quantity</Text>
                <Text style={styles.tableHeaderText}>Unit</Text>
                <Text style={styles.tableHeaderText}>Price</Text>
                <Text style={styles.tableHeaderText}>Amount</Text>
            </View>
            {purchases.map((purchase) => (
                <View key={purchase.id} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{purchase.date.toDate().toLocaleDateString()}</Text>
                    <Text style={styles.tableCell}>{purchase.voucher}</Text>
                    <Text style={styles.tableCell}>{purchase.party}</Text>
                    <Text style={styles.tableCell}>{purchase.narration}</Text>
                    <Text style={styles.tableCell}>{purchase.item}</Text>
                    <Text style={styles.tableCell}>{purchase.quantity}</Text>
                    <Text style={styles.tableCell}>{purchase.unit}</Text>
                    <Text style={styles.tableCell}>{purchase.price}</Text>
                    <Text style={styles.tableCell}>{purchase.amount}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

export default PurchaseList;

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#ddd',
        padding: 8,
    },
    tableHeaderText: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
});
