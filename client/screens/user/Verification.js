import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import Card from '../../components/UI/Card';
import CustomButton from '../../components/UI/CustomButton';

const Verification = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.instructionsContainer}>
        <Text style={styles.label}>Instructions</Text>
        <Text style={styles.instructions}>
          Enter the 4 digit verification code and your new password here.
        </Text>
      </View>
      <Card>
        <View style={styles.container}>
          <Text style={styles.label}>enter your verification code:</Text>
          <TextInput style={styles.emailInput} />
          <Text style={styles.label}>enter your new password:</Text>
          <TextInput style={styles.emailInput} />
          <Text style={styles.label}>confirm your new password:</Text>
          <TextInput style={styles.emailInput} />
          <View style={styles.buttonContainer}>
            <CustomButton onSelect={() => console.log('should log in now')}>
              <Text style={styles.buttonText}>Reset Password</Text>
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

export default Verification;
