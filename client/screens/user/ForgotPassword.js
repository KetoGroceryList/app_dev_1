import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../../components/UI/Card';
import CustomButton from '../../components/UI/CustomButton';
import * as authActions from '../../store/actions/auth';

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('');

  const veriCode = useSelector((state) => state.auth.veriCode);
  console.log(veriCode);

  const dispatch = useDispatch();

  const forgotPasswordHandler = async (email) => {
    await dispatch(authActions.forgotPassword(email));
  };

  useEffect(() => {
    if (veriCode) {
      props.navigation.navigate('Verification');
    }
  }, [veriCode]);

  return (
    <View style={styles.screen}>
      <View style={styles.instructionsContainer}>
        <Text style={styles.label}>Instructions</Text>
        <Text style={styles.instructions}>
          To reset your password, please enter your email here and click
          'Verification Code'. Nordin will send a 4 digit verification code to
          your email. Use that code for the next step.
        </Text>
      </View>
      <Card>
        <View style={styles.container}>
          <Text style={styles.label}>enter your email:</Text>
          <TextInput
            style={styles.emailInput}
            keyboardType="email-address"
            autoCapitalize="none"
            required
            value={email}
            onChangeText={(value) => setEmail(value)}
            maxLength={25}
          />
          <View style={styles.buttonContainer}>
            <CustomButton onSelect={() => forgotPasswordHandler(email)}>
              <Text style={styles.buttonText}>Get Verification Code</Text>
            </CustomButton>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  instructionsContainer: {
    width: '80%',
    marginVertical: 30,
    backgroundColor: '#fff',
  },
  instructions: {
    fontFamily: 'open-sans',
    fontSize: 16,
    marginVertical: 15,
  },
  container: {
    width: 250,
    marginHorizontal: 30,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 5,
  },
  emailInput: {
    fontSize: 20,
    fontFamily: 'open-sans',
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: '100%',
    paddingLeft: 4,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 15,
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    color: 'white',
  },
});

export default ForgotPassword;
