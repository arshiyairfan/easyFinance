import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const LedgerList = () => {
    const [ledger, setLedger] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const paymentSnap = await firestore().collection("Payment").get();
                const ledgerData = paymentSnap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setLedger(ledgerData);
            } catch (error) {
                console.error("Error fetching ledger entries: ", error);
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
                    <Text style={styles.tableHeaderText}>D/C</Text>
                    <Text style={styles.tableHeaderText}>Account</Text>
                    <Text style={styles.tableHeaderText}>Debit</Text>
                    <Text style={styles.tableHeaderText}>Credit</Text>
                    <Text style={styles.tableHeaderText}>Narration</Text>
                </View>
                {ledger.map((entry) => (
                    <View key={entry.id} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{new Date(entry.date.seconds * 1000).toLocaleDateString()}</Text>
                        <Text style={styles.tableCell}>{entry.voucher}</Text>
                        <Text style={styles.tableCell}>{entry.DC}</Text>
                        <Text style={styles.tableCell}>{entry.account}</Text>
                        <Text style={styles.tableCell}>{entry.debit}</Text>
                        <Text style={styles.tableCell}>{entry.credit}</Text>
                        <Text style={styles.tableCell}>{entry.narration}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default LedgerList;

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
