import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Button, FlatList, Text, Alert, TouchableWithoutFeedback, TouchableOpacity, Dimensions } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function PasswordManager() {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [credentials, setCredentials] = useState([]);
  const [displayedPassword, setDisplayedPassword] = useState('');

  const [passwordPage, setPasswordPage] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const [selectedCredential, setSelectedCredential] = useState(null);

  const handleLogin = () => {
    if (passwordPage === '') {
      setAuthenticated(true);
    } else {
      alert('Mot de passe incorrect');
    }
  };

  useEffect(() => {
    async function loadCredentials() {
      try {
        const credentialsArray = await AsyncStorage.getItem('credentials');
        if (credentialsArray !== null) {
          setCredentials(JSON.parse(credentialsArray));
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadCredentials();
  }, []);

  const handleSave = async () => {
    if (!title || !username || !password) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    try {
      const newCredentials = {
        title,
        username,
        password,
      };
      const updatedCredentials = [...credentials, newCredentials];
      await AsyncStorage.setItem('credentials', JSON.stringify(updatedCredentials));
      setCredentials(updatedCredentials);
      setTitle('');
      setUsername('');
      setPassword('');
      alert('Les informations de connexion ont été enregistrées avec succès');
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = (index) => {
    Alert.alert(
      "Supprimer l'identifiant",
      "Êtes-vous sûr de vouloir supprimer cet identifiant?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const updatedCredentials = [...credentials];
              updatedCredentials.splice(index, 1);
              await AsyncStorage.setItem('credentials', JSON.stringify(updatedCredentials));
              setCredentials(updatedCredentials);
            } catch (error) {
              console.error(error);
            }
          }
        }
      ]
    );
  }
  
  const renderCredentials = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <TouchableWithoutFeedback onPress={() => setSelectedCredential(item)} onLongPress={() => handleDelete(index)}>
          <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={() => handleDelete(index)}>
          <Entypo name="trash" size={24} color="black" />
        </TouchableOpacity>
        <Text></Text>
      </View>
    );
  };

  const copyToClipboard = async (password) => {
    await Clipboard.setStringAsync(password);
    alert('Copié dans le presse-papier');
  };

  const CredentialDetails = ({ credential, onClose }) => {
    const toggleShowPassword = () => {
      const password = credential.password;
      setDisplayedPassword(prevDisplayedPassword => prevDisplayedPassword === password ? '' : password);
    };
    
    return (
      <View style={styles.credentialDetails}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Entypo name="cross" size={30} color="white" />
        </TouchableOpacity>
        <Text style={[styles.item, {fontWeight: 'bold'}, {fontSize:25}]}>{credential.title}</Text>
        <Text style={[styles.item, {fontSize:18}]}>{credential.username}</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <TextInput
              style={[styles.item, {fontSize:18}]}
              secureTextEntry={displayedPassword !== credential.password}
              value={displayedPassword === credential.password ? credential.password : credential.password.replace(/./g, '*')}
              editable={false}
            />
          </View>
          <Entypo
            name={displayedPassword === credential.password ? 'eye-with-line' : 'eye'}
            size={30}
            color="gray"
            onPress={toggleShowPassword}
            style={{padding: 10}}
          />
          <TouchableOpacity onPress={() => copyToClipboard(credential.password)} style={{padding: 10}}>
            <MaterialIcons name="content-paste" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  if (!authenticated) {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={passwordPage}
          onChangeText={setPasswordPage}
        />
        <Button title="Connexion" onPress={handleLogin} />
      </View>
    );
  } else if (selectedCredential !== null) {
    return (
      <CredentialDetails
        credential={selectedCredential}
        onClose={() => setSelectedCredential(null)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Titre"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Ajouter" onPress={handleSave} />
        <FlatList
          data={credentials}
          renderItem={renderCredentials}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
};

const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: '#ccc',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  password: {
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: screenHeight * 0.88,
    right: 20,
    borderRadius: 50,
    backgroundColor: '#4000ff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    elevation: 5,
  },
});
