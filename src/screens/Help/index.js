import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text as RNText, TouchableOpacity, TextInput, Modal } from 'react-native';

function Text(props) {
    return <RNText {...props} style={[props.style, { fontFamily: 'Poppins_600SemiBold' }]} />;
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
                <View style={styles.calculatorOverlay}>
                    <View style={styles.calculatorContainer}>
                        <TextInput
                            style={styles.calculatorInput}
                            value={`R$ ${input}`}
                            editable={false}
                            textAlign={'left'}
                        />
                        <View style={styles.buttonsContainer}>
                            {["C", "±", "%", "/", "7", "8", "9", "*", "4", "5", "6", "+", "1", "2", "3", "-", ",", "0", "D"].map((button, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.button, button.match(/[0-9,]/) ? styles.numberButton : styles.operatorButton]}
                                    onPress={() => {
                                        if (button === "R") {
                                            setShowCalculator(false);
                                        } else if (button === "D") {
                                            handleCalculate();
                                        } else {
                                            handlePress(button);
                                        }
                                    }}
                                >
                                    <Text style={styles.buttonText}>{button}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity
                                style={[styles.button, styles.confirmButton]}
                                onPress={() => setShowCalculator(false)}
                            >
                                <Text style={styles.buttonText}>R</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
  summaryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 28,
  },
  summaryCard: {
      flex: 0.48,
      padding: 15,
      borderRadius: 12,
      borderWidth: 2,
  },
  summaryText: {
      fontSize: 14,
      fontFamily: 'Poppins_600SemiBold',
  },
  summaryAmount: {
      fontSize: 18,
      fontFamily: 'Poppins_700Bold',
  },
  recordCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: 12,
      padding: 15,
      marginBottom: 20,
  },
  recordCategory: {
      fontSize: 14,
      fontFamily: 'Poppins_600SemiBold',
  },
  recordAmount: {
      fontSize: 12,
      fontFamily: 'Poppins_400Regular',
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
      fontFamily: 'Poppins_600SemiBold',
  },
  calculatorOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.3)',
  },
  calculatorContainer: {
      backgroundColor: 'white',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
  },
  calculatorInput: {
      width: '100%',
      padding: 15,
      fontSize: 24,
      textAlign: 'left',
      marginBottom: 20,
      backgroundColor: 'white',
      borderWidth: 0,  // Removed the border
  },
  buttonsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      margin: 1,  // Added spacing
  },
  button: {
      width: '24%',
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,  // Rounded corners
      margin: 1,  // Added spacing
  },
  numberButton: {
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,  // Light shadow
      shadowRadius: 1,  // Light shadow
  },
  operatorButton: {
      borderColor: 'rgba(0, 0, 0, 0.2)',
      borderWidth: 1,
  },
  confirmButton: {
      backgroundColor: '#FB5F21',  // Confirm button color
  },
  buttonText: {
      fontSize: 24,
      color: 'black',
      fontFamily: 'Poppins_600SemiBold',
  },
});
