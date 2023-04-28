import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// NfcManager.start();

function Cards() {
    const [showNumber, setShowNumber] = useState(false);
    const toggleShowNumber = () => setShowNumber(!showNumber);
    const cardNumber = showNumber ? '1234 5678 9012 3456' : '**** **** **** ****';
    return (
        <>
        <View style={styles.card}>
            <Image source={require('./assets/Mastercard-logo.png')} style={styles.logo} />
            <Text style={styles.number}>{cardNumber}</Text>
            <Text style={styles.name}>Name LASTNAME</Text>
            <Text style={styles.expiration}>Expires 12/24</Text>
        </View>
        <View>
            <Entypo name={showNumber ? 'eye-with-line' : 'eye'} size={24} color='#777' onPress={toggleShowNumber} style={styles.icon} />
            <MaterialIcons name="wifi" size={200} color="black" style={styles.nfc}/>
        </View>
        </>
    );
/*
  async function readNdef() {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      console.warn('Tag found', tag);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={readNdef}>
        <Text>Scan a Tag</Text>
      </TouchableOpacity>
    </View>
  );
*/
}

const styles = StyleSheet.create({
    card: {
        marginTop: 20,
        height: 200,
        width: 320,
        borderRadius: 16,
        backgroundColor: '#262626',
        padding: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignSelf: 'center',
    },

    logo: {
        height: '20%',
        width: "20%",
        marginBottom: 16,
    },

    icon: {
        textAlign: 'center',
        borderRadius: 50,
        backgroundColor: '#777',
        color: '#F3F3F3',
        alignSelf: 'center',
        padding: 8,
        marginTop: 16,
    },

    nfc: {
        top: 180,
        textAlign: 'center',
        borderRadius: 50,
        backgroundColor: '#777',
        color: '#F3F3F3',
        alignSelf: 'center',
        padding: 8,
        marginTop: 16,
    },

    number: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F3F3F3',
        marginBottom: 16,
    },

    name: {
        fontSize: 16,
        color: '#F3F3F3',
        marginBottom: 8,
    },

    expiration: {
        fontSize: 16,
        color: '#777',
    },
});

export default Cards;