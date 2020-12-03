import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from '../screens/user/Auth';
import ForgotPassword from '../screens/user/ForgotPassword';
import Profile from '../screens/user/Profile';
import ResetPassword from '../screens/user/ResetPassword';

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen name="Auth" component={Auth} />
      <AuthStackNavigator.Screen
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <AuthStackNavigator.Screen name="Profile" component={Profile} />
      <AuthStackNavigator.Screen
        name="ResetPassword"
        component={ResetPassword}
      />
    </AuthStackNavigator.Navigator>
  );
};

const SavedListsStackNavigator = createStackNavigator();
