import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

const Auth = (props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={15}
      style={styles.screen}
    >
      <LinearGradient colors={['#7d9d18', '#7d8d18']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.label}>e-mail</Text>
            <TextInput
              id="email"
              keyboardType="email-address"
              autoCapitalize="none"
              errorMessage="Please enter a valid email address"
              onValue={() => {}}
              initialValue=""
              required
              style={styles.textInput}
            />
            <Text style={styles.label}>password</Text>
            <TextInput
              id="password"
              label="password"
              keyboardType="default"
              secureTextEntry
              autoCapitalize="none"
              minLength={5}
              errorMessage="Please enter a password"
              onValue={() => {}}
              initialValue=""
              required
              style={styles.textInput}
            />
            <View style={styles.buttonContainer}>
              <Button title="Login" onPress={() => {}} color={Colors.primary} />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Switch to Sign Up"
                onPress={() => {}}
                color={Colors.primary}
              />
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
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 1,
    fontSize: 16,
  },
  textInput: {
    height: 25,
    marginVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  buttonContainer: {
    marginVertical: 3,
  },
});

export default Auth;
