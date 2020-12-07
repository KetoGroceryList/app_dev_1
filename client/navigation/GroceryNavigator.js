import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Auth from '../screens/user/Auth';
import ForgotPassword from '../screens/user/ForgotPassword';
import Profile from '../screens/user/Profile';
import ResetPassword from '../screens/user/ResetPassword';
import SavedLists from '../screens/grocery/SavedLists';
import SavedListDetails from '../screens/grocery/SavedListDetails';
import CurrentList from '../screens/grocery/CurrentList';
import ContactUs from '../screens/info/ContactUs';
import FoodGroups from '../screens/info/FoodGroups';
import FoodGroupItems from '../screens/info/FoodGroupItems';
import FavFoods from '../screens/grocery/FavFoods';
import FoodDetails from '../screens/info/FoodDetails';

import Colors from '../constants/Colors';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: { fontFamily: 'open-sans-bold' },
  headerBackTitleStyle: { fontFamily: 'open-sans' },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={Auth}
        options={{ headerTitle: 'Please Authenticate' }}
      />
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

const CurrentListStackNavigator = createStackNavigator();

export const CurrentListNavigator = () => {
  return (
    <CurrentListStackNavigator.Navigator>
      <CurrentListStackNavigator.Screen
        name="CurrentList"
        component={CurrentList}
      />
    </CurrentListStackNavigator.Navigator>
  );
};

const SavedListsStackNavigator = createStackNavigator();

export const SavedListsNavigator = () => {
  return (
    <SavedListsStackNavigator.Navigator>
      <SavedListsStackNavigator.Screen
        name="SavedLists"
        component={SavedLists}
      />
      <SavedListsStackNavigator.Screen
        name="SavedListDetails"
        component={SavedListDetails}
      />
    </SavedListsStackNavigator.Navigator>
  );
};

const ContactUsStackNavigator = createStackNavigator();

export const ContactUsNavigator = () => {
  return (
    <ContactUsStackNavigator.Navigator>
      <ContactUsStackNavigator.Screen name="Contact Us" component={ContactUs} />
    </ContactUsStackNavigator.Navigator>
  );
};

const FoodGroupsStackNavigator = createStackNavigator();

export const FoodGroupsNavigator = () => {
  return (
    <FoodGroupsStackNavigator.Navigator>
      <FoodGroupsStackNavigator.Screen
        name="Food Groups"
        component={FoodGroups}
      />
      <FoodGroupsStackNavigator.Screen
        name="Food Group Items"
        component={FoodGroupItems}
      />
    </FoodGroupsStackNavigator.Navigator>
  );
};

const FavFoodsStackNavigator = createStackNavigator();

export const FavFoodsNavigator = () => {
  return (
    <FavFoodsStackNavigator.Navigator>
      <FavFoodsStackNavigator.Screen
        name="Favourite Foods"
        component={FavFoods}
      />
    </FavFoodsStackNavigator.Navigator>
  );
};

const FoodDetailsStackNavigator = createStackNavigator();

export const FoodDetailsNavigator = () => {
  return (
    <FoodDetailsStackNavigator.Navigator>
      <FoodDetailsStackNavigator.Screen
        name="FoodDetails"
        component={FoodDetails}
      />
    </FoodDetailsStackNavigator.Navigator>
  );
};

const GroceryBottomTabNavigator = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <GroceryBottomTabNavigator.Navigator>
      <GroceryBottomTabNavigator.Screen
        name="Today's List"
        component={CurrentListNavigator}
      />
      <GroceryBottomTabNavigator.Screen
        name="Saved Lists"
        component={SavedListsNavigator}
      />
      <GroceryBottomTabNavigator.Screen
        name="Contact Us"
        component={ContactUsNavigator}
      />
      <GroceryBottomTabNavigator.Screen
        name="Favourites"
        component={FavFoodsNavigator}
      />
      <GroceryBottomTabNavigator.Screen
        name="Profile"
        component={AuthNavigator}
      />
    </GroceryBottomTabNavigator.Navigator>
  );
};
