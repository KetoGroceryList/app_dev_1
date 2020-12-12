import React, { useState } from 'react';
import axios from 'axios';
import { LogBox } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import AppNavigator from './navigation/AppNavigator';
import authReducer from './store/reducers/auth';
import foodsReducer from './store/reducers/foods';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'abside-regular': require('./assets/fonts/Abside-Regular.ttf'),
    'nordin-regular': require('./assets/fonts/Nordin-Rounded-Regular.ttf'),
  });
};

const rootReducer = combineReducers({
  auth: authReducer,
  foods: foodsReducer,
});

// let favFoods = [];

// const getSavedFavList = async () => {
//   const response = await axios.get('http://192.168.0.197:5000/api/favFoods/');
//   favFoods = await response.data.data.favFoodsArray;
//   return favFoods;
// };

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  LogBox.ignoreLogs(['Setting a timer']);

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
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
