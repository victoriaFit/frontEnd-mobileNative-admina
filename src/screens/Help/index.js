import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text as RNText, TouchableOpacity, TextInput, Modal } from 'react-native';

function Text(props) {
    return <RNText {...props} style={[props.style, {}]} />;
}

export default function FinanceScreen() {
    const [records, setRecords] = useState([]);
    const [input, setInput] = useState("");
    const [showButtons, setShowButtons] = useState(false);
    const [showCalculator, setShowCalculator] = useState(false);

    useEffect(() => {
        const initialRecords = Array(30).fill().map((_, i) => ({
            id: i,
            category: i % 2 === 0 ? 'Incomes' : 'Expenses',
            amount: (i * 100).toFixed(2),
            date: `2023-${String(i % 12 + 1).padStart(2, '0')}-01`
        })).sort((a, b) => a.date.localeCompare(b.date));
        setRecords(initialRecords);
    }, []);

    const toggleButtons = () => {
        setShowButtons(!showButtons);
    };

    const openCalculator = () => {
        setShowButtons(false);
        setShowCalculator(true);
    };

    const handlePress = (value) => {
        setInput(input + value);
    };

    const handleClear = () => {
        setInput("");
    };

    const handleCalculate = () => {
        try {
            setInput(eval(input).toString());
        } catch (e) {
            setInput("Error");
        }
    };

    const totalIncomes = records.filter(r => r.category === 'Incomes').reduce((sum, r) => sum + parseFloat(r.amount), 0);
    const totalExpenses = records.filter(r => r.category === 'Expenses').reduce((sum, r) => sum + parseFloat(r.amount), 0);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.summaryContainer}>
                <View style={[styles.summaryCard, { borderColor: '#CFFFC7' }]}>
                    <Text style={styles.summaryText}>Total Incomes</Text>
                    <Text style={styles.summaryAmount}>R$ {totalIncomes.toFixed(2)}</Text>
                </View>
                <View style={[styles.summaryCard, { borderColor: '#FFCFCF' }]}>
                    <Text style={styles.summaryText}>Total Expenses</Text>
                    <Text style={styles.summaryAmount}>R$ {totalExpenses.toFixed(2)}</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 28 }}>
                {records.map((record, index) => (
                    <TouchableOpacity key={index} style={styles.recordCard}>
                        <Text style={styles.recordCategory}>{record.category}</Text>
                        <Text style={styles.recordAmount}>R$ {record.amount}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.fabContainer}>
                {showButtons && (
                    <>
                        <TouchableOpacity style={styles.fabButton} onPress={openCalculator}>
                            <Text style={styles.fabText}>I</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fabButton} onPress={openCalculator}>
                            <Text style={styles.fabText}>E</Text>
                        </TouchableOpacity>
                    </>
                )}
                <TouchableOpacity style={styles.fabMainButton} onPress={toggleButtons}>
                    <Text style={styles.fabText}>+</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={showCalculator} transparent={true}>
                <View style={styles.calculatorContainer}>
                    <TextInput
                        style={styles.calculatorInput}
                        value={input}
                        editable={false}
                    />
                    <View style={styles.buttonsContainer}>
                        {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "+", "-", "*", "/", "="].map((button, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.button}
                                onPress={() => {
                                    if (button === "=") {
                                        handleCalculate();
                                    } else {
                                        handlePress(button);
                                    }
                                }}
                            >
                                <Text style={styles.buttonText}>{button}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity style={styles.button} onPress={handleClear}>
                            <Text style={styles.buttonText}>C</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.doneButton} onPress={() => setShowCalculator(false)}>
                        <Text style={styles.doneButtonText}>Concluir</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
        borderRadius: 12,
        borderWidth: 2
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
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    fabContainer: {
        position: 'absolute',
        bottom: 28,
        right: 28,
    },
    fabMainButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#FB5F21',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    fabButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#FB5F21',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    fabText: {
        fontSize: 24,
        color: 'white',
    },
    calculatorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    calculatorInput: {
      width: '80%',
      padding: 15,
      fontSize: 24,
      textAlign: 'right',
      marginBottom: 20,
      backgroundColor: 'white',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    buttonsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '80%',
    },
    button: {
      width: '23%',
      padding: 20,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    buttonText: {
      fontSize: 24,
      color: 'black',
    },
    doneButton: {
      backgroundColor: '#FB5F21',
      borderRadius: 8,
      padding: 10,
      marginTop: 20,
    },
    doneButtonText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
    },
  calculatorButtons: {
      flexDirection: 'row',
      marginBottom: 20,
  },
});
