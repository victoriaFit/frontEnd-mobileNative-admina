import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text as RNText, TouchableOpacity, Image, Animated, Modal, Button, Linking, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { createStackNavigator } from '@react-navigation/stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import equipmentService from '../../services/equipments';


function Text(props) {
    return <RNText {...props} style={[props.style, {}]} />;
  }

export default function AssistanceScreen() {
    const [serviceType, setServiceType] = useState(null);
    const [hasPreviousOrder, setHasPreviousOrder] = useState(null);
    const [equipment, setEquipment] = useState('');
    const [brand, setBrand] = useState('');
    const [serviceLocation, setServiceLocation] = useState(null);
    const [desiredDate, setDesiredDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [name, setName] = useState('Augusto Vice');
    const [cep, setCep] = useState('89210-680');
    const [location, setLocation] = useState('');
    const [equipments, setEquipments] = useState([]);

    useEffect(async () => {
      const data = await equipmentService.getAllEquipments();
      setEquipments(data);
    }, []);
  
    useEffect(() => {
      const fetchLocation = async () => {
        const response = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
        const data = await response.json();
        if (data.bairro && data.localidade) {
          setLocation(` e sou do bairro ${data.bairro}, ${data.localidade}`);
        }
      };
  
      fetchLocation();
    }, [cep]);
  
    const handleConfirm = (date) => {
      setDesiredDate(date);
      hideDatePicker();
    };
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
  
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', backgroundColor: 'white', padding: 28 }}>
        <Text style={{ marginBottom: 20, fontFamily: 'Poppins_400Regular' }}>Em desenvolvimento.</Text>
    
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    buttonTitle: {
      fontFamily: "Poppins_600SemiBold",
      fontSize: 15,
    },
    buttonText: {
      fontFamily: "Poppins_400Regular",
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.6)',
    },
  });