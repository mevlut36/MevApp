import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import PasswordManager from './PasswordManager';
import ChatGPT from './ChatGPT';

function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Wesh bien ?</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function Menu() {
  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ drawerLabel: 'Home' }}
      />
      <Drawer.Screen
        name="ChatGPT"
        component={ChatGPT}
        options={{ drawerLabel: 'ChatGPT' }}
      />
      <Drawer.Screen
        name="Gestionnaire de mots de passe"
        component={PasswordManager}
        options={{ drawerLabel: 'Gestionnaire de mots de passe' }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Menu />
    </NavigationContainer>
  );
}
