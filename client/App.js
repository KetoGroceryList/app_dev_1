import Axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const App = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerHandler = async () => {
    console.log('post');
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });
    await axios.post('http://localhost:5000/api/auth/register', body, config);
  };

  const getUserHandler = async () => {
    const response = await axios.get('http://localhost:5000/api/users/');
    console.log(response.data);
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        placeholder="name"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.textInput}
        value={email}
        placeholder="email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        value={password}
        placeholder="password"
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="register" onPress={registerHandler} />
      <Button title="get user" onPress={getUserHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
  },
});

export default App;
