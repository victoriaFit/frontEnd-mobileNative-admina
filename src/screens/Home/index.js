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

export default function HomeScreen({ navigation }) {
    const [name, setName] = useState('Augusto Vice');
    const [cep, setCep] = useState('89210-680');
    const [equipments, setEquipments] = useState([]);

    useEffect(async () => {
      const data = await equipmentService.getAllEquipments();
      setEquipments(data);
    }, []);

    async function updateEquipments() {
      const data = await equipmentService.getAllEquipments();
      setEquipments(data);
    }

    const handleWhatsAppRedirect = async () => {
      let location = '';
      if (cep) {
        const response = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
        const data = await response.json();
        if (data.bairro && data.localidade) {
          location = ` e sou do bairro ${data.bairro}, ${data.localidade}`;
        }
      }
  
      let message = name || cep ? `Olá, me chamo ${name}${location}.` : "Bom dia! Gostaria de solicitar um serviço!";
      let encodedMessage = encodeURIComponent(message);
      let whatsappUrl = `https://api.whatsapp.com/send/?phone=%2B5547992531701&text=${encodedMessage}&type=phone_number&app_absent=0`;
      Linking.openURL(whatsappUrl);
    };
  
    const handleCepChange = (text) => {
      let newText = '';
      let numbers = '0123456789';
  
      for (var i = 0; i < text.length; i++) {
        if (numbers.indexOf(text[i]) > -1) {
          newText = newText + text[i];
        }
        else {
          newText = newText.slice(0, -1);
        }
      }
      if (newText.length <= 7) {
        setCep(newText);
      } else {
        setCep(newText.slice(0, 5) + '-' + newText.slice(5, 8));
      }
    }
  
    const greeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        return "Bom dia";
      } else if (currentHour < 18) {
        return "Boa tarde";
      } else {
        return "Boa noite";
      }
    }
  
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', backgroundColor: 'white', padding: 28 }}>
        <View style={{ borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 12, padding: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 20, marginBottom: 20, fontFamily: 'Poppins_600SemiBold', textAlign: 'center' }}>
            {greeting()} {name}
          </Text>
          
          <Text style={{ fontFamily: "Poppins_400Regular" }}>Navegue pelo aplicativo e descubra todas as nossas opções de serviços.</Text>
        </View>
  
  
        <Text style={{ marginTop: 40, fontSize: 16, fontFamily: "Poppins_600SemiBold" }}>Acesso rápido</Text>
        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)', marginVertical: 20 }} />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('produtos')}>
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1133459504109998220/shopping.png' }}
            style={{ width: 28, height: 28, marginRight: 10 }}
          />
          <View>
            <Text style={styles.buttonTitle}>Assistência</Text>
            <Text style={styles.buttonText}>Manutenção, Reparo</Text>
          </View>
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1131681200059207740/right-arrow_1.png' }}
            style={{ marginLeft: 'auto', width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)', marginVertical: 20 }} />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('serviços')}>
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1091506792900595863/1145491758734647407/history.png' }}
            style={{ width: 28, height: 28, marginRight: 10 }}
          />
          <View>
            <Text style={styles.buttonTitle}>Vendas</Text>
            <Text style={styles.buttonText}>Equipamentos, Peças, Produtos</Text>
          </View>
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1131681200059207740/right-arrow_1.png' }}
            style={{ marginLeft: 'auto', width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)', marginVertical: 20 }} />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('caixa')}>
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1091506792900595863/1145484460586967151/money.png' }}
            style={{ width: 28, height: 28, marginRight: 10 }}
          />
          <View>
            <Text style={styles.buttonTitle}>Caixa</Text>
            <Text style={styles.buttonText}>Dinheiros</Text>
          </View>
          <Image
            source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1131681200059207740/right-arrow_1.png' }}
            style={{ marginLeft: 'auto', width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)', marginVertical: 20 }} />
        
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