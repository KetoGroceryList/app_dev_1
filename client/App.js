import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';
import foodsReducer from './store/reducers/foods';
import authReducer from './store/reducers/auth';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

const rootReducer = combineReducers({
  foods: foodsReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
