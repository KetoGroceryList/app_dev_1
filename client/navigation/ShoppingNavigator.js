import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Auth from '../screens/user/Auth';
import ForgotPassword from '../screens/user/ForgotPassword';
import Profile from '../screens/user/Profile';
import ResetPassword from '../screens/user/ResetPassword';
import SavedLists from '../screens/shopping/SavedLists';
import SavedListDetails from '../screens/shopping/SavedListDetails';
import CurrentList from '../screens/shopping/CurrentList';
import ContactUs from '../screens/info/ContactUs';
import FoodGroups from '../screens/info/FoodGroups';
import FoodGroupItems from '../screens/info/FoodGroupItems';
import FavFoods from '../screens/shopping/FavFoods';
import FoodDetails from '../screens/info/FoodDetails';

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

const ShoppingBottomTabNavigator = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <ShoppingBottomTabNavigator.Navigator>
      <ShoppingBottomTabNavigator.Screen
        name="Saved Lists"
        component={SavedListsNavigator}
      />
      <ShoppingBottomTabNavigator.Screen
        name="Contact Us"
        component={ContactUsNavigator}
      />
      <ShoppingBottomTabNavigator.Screen
        name="Today's List"
        component={CurrentListNavigator}
      />
      <ShoppingBottomTabNavigator.Screen
        name="Favourites"
        component={FavFoodsNavigator}
      />
      <ShoppingBottomTabNavigator.Screen
        name="Profile"
        component={AuthNavigator}
      />
    </ShoppingBottomTabNavigator.Navigator>
  );
};
