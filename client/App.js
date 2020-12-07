import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';
import foodsReducer from './store/reducers/foods';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

const rootReducer = combineReducers({
  foods: foodsReducer,
});

const store = createStore(rootReducer);

const App = (props) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;

//const [name, setName] = useState('');
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');

// const registerHandler = async () => {
//   console.log('post');

//   const body = JSON.stringify({ name, email, password });

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   await axios.post('http://localhost:5000/api/auth/register', body, config);
// };

// const getUserHandler = async () => {
//   const response = await axios.get('http://localhost:5000/api/users/');
//   console.log(response.data);
// };

// const loginHandler = async () => {
//   const body = JSON.stringify({ email, password });

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   const response = await axios.post(
//     'http://localhost:5000/api/auth/login',
//     body,
//     config
//   );
//   console.log(response.data);
// };

// <View style={styles.container}>
//   <Text>This screen is used to test FE BE connections</Text>
//   <TextInput
//     style={styles.textInput}
//     value={name}
//     placeholder="name"
//     autoCapitalize="none"
//     onChangeText={(text) => setName(text)}
//   />
//   <TextInput
//     style={styles.textInput}
//     value={email}
//     placeholder="email"
//     autoCapitalize="none"
//     onChangeText={(text) => setEmail(text)}
//   />
//   <TextInput
//     style={styles.textInput}
//     value={password}
//     placeholder="password"
//     autoCapitalize="none"
//     onChangeText={(text) => setPassword(text)}
//   />
//   <Button title="register" onPress={registerHandler} />
//   <Button title="login" onPress={loginHandler} />
//   <Button title="get users" onPress={getUserHandler} />

// </View>
