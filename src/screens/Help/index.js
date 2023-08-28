import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text as RNText, TouchableOpacity } from 'react-native';

function Text(props) {
    return <RNText {...props} style={[props.style, {}]} />;
}

export default function FinanceScreen() {
    const categories = ['Incomes', 'Expenses'];
    const records = Array(30).fill().map((_, i) => ({
        id: i,
        category: categories[i % categories.length],
        amount: (i * 100).toFixed(2),
        date: `2023-${String(i % 12 + 1).padStart(2, '0')}-01`
    })).sort((a, b) => a.date.localeCompare(b.date));

    let lastMonth = null;

    const totalIncomes = records.filter(r => r.category === 'Incomes').reduce((sum, r) => sum + parseFloat(r.amount), 0);
    const totalExpenses = records.filter(r => r.category === 'Expenses').reduce((sum, r) => sum + parseFloat(r.amount), 0);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.summaryContainer}>
                <View style={[styles.summaryCard, { backgroundColor: '#FB5F21' }]}>
                    <Text style={styles.summaryText}>Total Incomes</Text>
                    <Text style={styles.summaryAmount}>$ {totalIncomes.toFixed(2)}</Text>
                </View>
                <View style={[styles.summaryCard, { backgroundColor: 'gray' }]}>
                    <Text style={styles.summaryText}>Total Expenses</Text>
                    <Text style={styles.summaryAmount}>$ {totalExpenses.toFixed(2)}</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 28 }}>
                {records.map((record) => {
                    const currentMonth = new Date(record.date).getMonth();
                    const shouldDisplayMonth = lastMonth !== currentMonth;
                    lastMonth = currentMonth;

                    return (
                        <View key={record.id}>
                            {shouldDisplayMonth && (
                                <View style={styles.monthSeparator}>
                                    <Text style={styles.monthText}>{new Date(record.date).toLocaleString('default', { month: 'long' })}</Text>
                                </View>
                            )}
                            <TouchableOpacity style={styles.recordCard}>
                                <View style={styles.recordContent}>
                                    <Text style={styles.recordCategory}>{record.category}</Text>
                                    <Text style={styles.recordAmount}>$ {record.amount}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 28
    },
    summaryCard: {
        flex: 0.48,
        padding: 15,
        borderRadius: 12
    },
    summaryText: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold'
    },
    summaryAmount: {
        fontSize: 18,
        fontFamily: 'Poppins_700Bold'
    },
    recordCard: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20
    },
    recordCategory: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold'
    },
    recordAmount: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular'
    },
    monthSeparator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20
    },
    monthText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        marginRight: 10
    },
    recordContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});
