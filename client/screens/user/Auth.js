import React, { useState, useEffect, useReducer, useCallback } from 'react';
//import axios from 'axios';
import {
  View,
  Button,
  Alert,
  ScrollView,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

import { FORM_INPUT_UPDATE } from '../../store/types';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};

const Auth = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: '',
      email: '',
      password: '',
    },
    inputValidities: {
      name: false,
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.register(
        formState.inputValues.name,
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }

    setError(null);
    setIsLoading(true);
    try {
      dispatch(action);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={15}
      style={styles.screen}
    >
      <LinearGradient colors={['#7d9d18', '#7d8d18']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView style={styles.scrollView}>
            {isSignup ? (
              <Input
                id="name"
                label="name"
                keyboardType="default"
                autoCapitalize="none"
                errorText="Please enter your name"
                onInputChange={inputChangeHandler}
                initialValue=""
                required
                style={styles.textInput}
              />
            ) : null}

            <Input
              id="email"
              label="e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              errorText="Please enter a valid email"
              onInputChange={inputChangeHandler}
              initialValue=""
              required
              style={styles.textInput}
            />
            <Input
              id="password"
              label="password"
              keyboardType="default"
              secureTextEntry
              autoCapitalize="none"
              minLength={6}
              errorText="Please enter a valid password"
              onInputChange={inputChangeHandler}
              initialValue=""
              required
              style={styles.textInput}
            />
            <View style={styles.buttonContainer}>
              <Button
                title={isSignup ? 'Register' : 'Login'}
                onPress={authHandler}
                color={Colors.primary}
              />
            </View>
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primaryColor} />
              ) : (
                <Button
                  title={`Switch to ${isSignup ? 'Login' : 'Sign up'}`}
                  onPress={() => setIsSignup((prevState) => !prevState)}
                  color={Colors.primary}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Forgot Password"
                onPress={() => props.navigation.navigate('ForgotPassword')}
                color={Colors.primary}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Profile"
                onPress={() => props.navigation.navigate('Profile')}
                color={Colors.primary}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 600,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: '80%',
  },
  textInput: {
    height: 24,
    marginVertical: 5,
    marginBottom: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  buttonContainer: {
    marginVertical: 3,
  },
});

export default Auth;
