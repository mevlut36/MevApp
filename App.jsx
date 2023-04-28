import * as React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Card } from 'react-native-elements';

import PasswordManager from './PasswordManager';
import ChatGPT from './ChatGPT';
import Cards from './Cards';
import Calculatrice from './Calculatrice';

import { Entypo } from '@expo/vector-icons';

const CardManager = React.memo(({ onPress, backgroundColor, iconName, title, text }) => {
  const cardStyle = {
    marginBottom: 20,
    borderRadius: 10,
    padding: 30,
    elevation: 5,
    textAlign: 'center',
    flex: 1,
    flexGrow: 1,
    backgroundColor,
  };

  return (
    <TouchableOpacity style={styles.cardWrapper} onPress={onPress}>
      <Card containerStyle={cardStyle} title={title}>
        <Entypo name={iconName} style={styles.icon} />
        <Text style={styles.cardText}>{text}</Text>
      </Card>
    </TouchableOpacity>
  );
});

const Home = React.memo(({ navigation }) => {
  const cardStyle = {
    marginBottom: 20,
    borderRadius: 10,
    padding: 30,
    elevation: 5,
    textAlign: 'center',
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MevApp</Text>
        <Text style={styles.subtitle}>Découvrez nos dernières fonctionnalités :</Text>
      </View>
      <View style={styles.cardContainer}>
        <CardManager
          onPress={() => navigation.navigate('Gestionnaire de mots de passe')}
          backgroundColor="#3b3ea1"
          iconName="text-document"
          title="Gestionnaire de mots de passe"
          text="Gestionnaire de mots de passe"
        />
        <CardManager
          onPress={() => navigation.navigate('ChatGPT')}
          backgroundColor="#1a3071"
          iconName="chat"
          title="Chat en direct"
          text="ChatGPT"
        />
        <CardManager
          onPress={() => navigation.navigate('Cartes')}
          backgroundColor="#6548f0"
          iconName="credit-card"
          title="Cartes"
          text="Cartes"
        />
        <CardManager
          onPress={() => navigation.navigate('Calculatrice')}
          backgroundColor="#024b6e"
          iconName="calculator"
          title="Calculatrice"
          text="Calculatrice"
        />
      </View>
    </ScrollView>
  );
});

const Drawer = createDrawerNavigator();

const Menu = React.memo(() => {
  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ChatGPT"
        component={ChatGPT}
        options={{
          drawerLabel: 'ChatGPT',
          drawerIcon: ({ color, size }) => (
            <Entypo name="chat" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Gestionnaire de mots de passe"
        component={PasswordManager}
        options={{
          drawerLabel: 'Gestionnaire de mots de passe',
          drawerIcon: ({ color, size }) => (
            <Entypo name="text-document" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="Cartes"
        component={Cards}
        options={{
          drawerLabel: 'Cards',
          drawerIcon: ({ color, size }) => (
            <Entypo name="credit-card" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="Calculatrice"
        component={Calculatrice}
        options={{
          drawerLabel: 'Calculatrice',
          drawerIcon: ({ color, size }) => (
            <Entypo name="calculator" size={size} color={color} />
          )
        }}
      />
    </Drawer.Navigator>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  separator: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  cardWrapper: {
    width: '50%',
    marginBottom: 20,
  },
  cardText: {
    marginBottom: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    marginBottom: 10,
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Menu />
    </NavigationContainer>
  );
}
