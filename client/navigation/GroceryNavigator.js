import React from 'react';
import { Button, StyleSheet, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Auth from '../screens/user/Auth';
import ForgotPassword from '../screens/user/ForgotPassword';
import Profile from '../screens/user/Profile';
import ResetPassword from '../screens/user/ResetPassword';
import SavedLists from '../screens/grocery/SavedLists';
import SavedListDetails from '../screens/grocery/SavedListDetails';
import CurrentList, {
  currentListScreenOptions,
} from '../screens/grocery/CurrentList';
import ContactUs from '../screens/info/ContactUs';
import FoodGroups from '../screens/info/FoodGroups';
import FoodGroupItems from '../screens/info/FoodGroupItems';
import FavFoods from '../screens/grocery/FavFoods';
import FoodDetails from '../screens/info/FoodDetails';

import Colors from '../constants/Colors';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    fontFamily: 'nordin-regular',
    fontSize: 30,
  },
  headerBackTitleStyle: {
    fontFamily: 'nordin-regular',
    fontSize: 30,
  },
  headerTintColor: 'white',
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
    <CurrentListStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <CurrentListStackNavigator.Screen
        name="Current List"
        component={CurrentList}
      />
      <CurrentListStackNavigator.Screen
        name="Saved Lists"
        component={SavedLists}
      />
      <CurrentListStackNavigator.Screen
        name="Saved List Details"
        component={SavedListDetails}
      />
      <CurrentListStackNavigator.Screen
        name="Food Details"
        component={FoodDetails}
      />
    </CurrentListStackNavigator.Navigator>
  );
};

const FoodGroupsStackNavigator = createStackNavigator();

export const FoodGroupsNavigator = () => {
  return (
    <FoodGroupsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <FoodGroupsStackNavigator.Screen
        name="Food Groups"
        component={FoodGroups}
      />
      <FoodGroupsStackNavigator.Screen
        name="Food Group Items"
        component={FoodGroupItems}
      />
      <FoodGroupsStackNavigator.Screen
        name="Food Details"
        component={FoodDetails}
      />
    </FoodGroupsStackNavigator.Navigator>
  );
};

const FavFoodsStackNavigator = createStackNavigator();

export const FavFoodsNavigator = () => {
  return (
    <FavFoodsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <FavFoodsStackNavigator.Screen
        name="Favourite Foods"
        component={FavFoods}
      />
      <FavFoodsStackNavigator.Screen
        name="Food Details"
        component={FoodDetails}
      />
    </FavFoodsStackNavigator.Navigator>
  );
};

const ProfileStackNavigator = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfileStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProfileStackNavigator.Screen name="Profile" component={Profile} />
      <ProfileStackNavigator.Screen name="Contact Us" component={ContactUs} />
    </ProfileStackNavigator.Navigator>
  );
};

const GroceryBottomTabNavigator = createBottomTabNavigator();

const bottomTabOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color }) => {
    let iconName;

    if (route.name === "Today's List") {
      iconName = focused ? 'format-list-checks' : 'format-list-checkbox';
    } else if (route.name === 'Food Groups') {
      iconName = focused ? 'food-drumstick' : 'food-drumstick-outline';
    } else if (route.name === 'Favourites') {
      iconName = focused ? 'star' : 'star-outline';
    } else if (route.name === 'Profile') {
      iconName = focused ? 'account' : 'account-outline';
    }

    return <MaterialCommunityIcons name={iconName} size={30} color={color} />;
  },
});

export const BottomTabNavigator = () => {
  return (
    <GroceryBottomTabNavigator.Navigator
      screenOptions={bottomTabOptions}
      tabBarOptions={{
        activeTintColor: Colors.greenText,
        inactiveTintColor: 'gray',
      }}
    >
      <GroceryBottomTabNavigator.Screen
        name="Today's List"
        component={CurrentListNavigator}
      />
      <GroceryBottomTabNavigator.Screen
        name="Food Groups"
        component={FoodGroupsNavigator}
      />
      <GroceryBottomTabNavigator.Screen
        name="Favourites"
        component={FavFoodsNavigator}
      />
      <GroceryBottomTabNavigator.Screen
        name="Profile"
        component={ProfileNavigator}
      />
    </GroceryBottomTabNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  icons: {
    paddingVertical: 10,
  },
});