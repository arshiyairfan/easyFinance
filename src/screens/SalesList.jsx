import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const SalesList = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const salesSnap = await firestore().collection("sales").get();
                const salesData = salesSnap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setSales(salesData);
            } catch (error) {
                console.error("Error fetching sales entries: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Date</Text>
                    <Text style={styles.tableHeaderText}>Voucher</Text>
                    <Text style={styles.tableHeaderText}>Customer</Text>
                    <Text style={styles.tableHeaderText}>Item</Text>
                    <Text style={styles.tableHeaderText}>Quantity</Text>
                    <Text style={styles.tableHeaderText}>Price</Text>
                    <Text style={styles.tableHeaderText}>Amount</Text>
                </View>
                {sales.map((sale) => (
                    <View key={sale.id} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{new Date(sale.date.seconds * 1000).toLocaleDateString()}</Text>
                        <Text style={styles.tableCell}>{sale.voucher}</Text>
                        <Text style={styles.tableCell}>{sale.party}</Text>
                        <Text style={styles.tableCell}>{sale.item}</Text>
                        <Text style={styles.tableCell}>{sale.quantity}</Text>
                        <Text style={styles.tableCell}>{sale.unit}</Text>
                        <Text style={styles.tableCell}>{sale.price}</Text>
                        <Text style={styles.tableCell}>{sale.amount}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default SalesList;

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
