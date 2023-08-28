import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text as RNText, TouchableOpacity, Image } from 'react-native';

function Text(props) {
    return <RNText {...props} style={[props.style, {}]} />;
}

export default function ServicesScreen() {
    const serviceTypes = ['Manutenção', 'Reparo', 'Venda'];
    const statuses = ['Aguardando pagamento', 'Pago'];
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const services = Array(30).fill().map((_, i) => ({
        id: i,
        type: serviceTypes[i % serviceTypes.length],
        date: `2023-${String(i % 12 + 1).padStart(2, '0')}-01`,
        status: statuses[i % statuses.length]
    })).sort((a, b) => a.date.localeCompare(b.date));

    let lastMonth = null;

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 28 }}>
                {services.map((service) => {
                    const currentMonth = new Date(service.date).getMonth();
                    const shouldDisplayMonth = lastMonth !== currentMonth;
                    lastMonth = currentMonth;

                    return (
                        <View key={service.id}>
                            {shouldDisplayMonth && (
                                <View style={styles.monthSeparator}>
                                    <Text style={styles.monthText}>{monthNames[currentMonth]}</Text>
                                </View>
                            )}
                            <TouchableOpacity style={styles.serviceCard}>
                                <View style={styles.serviceContent}>
                                    <Image
                                        source={{ uri: 'https://cdn.discordapp.com/attachments/1059425565330911284/1133460259608993853/repair-tool.png' }}
                                        style={styles.serviceIcon}
                                    />
                                    <View style={styles.serviceTexts}>
                                        <Text style={styles.serviceType}>Tipo: {service.type}</Text>
                                        <Text style={styles.serviceInfo}>Data: {service.date}</Text>
                                        <Text style={styles.serviceInfo}>Status: {service.status}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                })}
                <TouchableOpacity style={styles.archiveSection}>
                    <Image
                        source={{ uri: 'https://cdn.discordapp.com/attachments/1091506792900595863/1145518763014361222/archive.png' }}
                        style={styles.archiveIcon}
                    />
                    <Text style={styles.archiveText}>Serviços Arquivados</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    serviceCard: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20
    },
    serviceIcon: {
        width: 20,
        height: 20,
        marginBottom: 10
    },
    serviceType: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold'
    },
    serviceInfo: {
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
    serviceContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    serviceTexts: {
        marginLeft: 10
    },
    archiveSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    archiveIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
        opacity: 0.5
    },
    archiveText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.5)'
    }
});
