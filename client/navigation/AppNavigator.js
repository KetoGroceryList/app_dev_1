import React from 'react';
import axios from 'axios';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './GroceryNavigator';
import { BottomTabNavigator } from '../navigation/GroceryNavigator';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      {/* <BottomTabNavigator /> */}
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
