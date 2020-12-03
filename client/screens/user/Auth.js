import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ForgotPassword from '../user/ForgotPassword';
import Profile from '../user/Profile';

const Auth = (props) => {
  return (
    <View style={styles.container}>
      <Text>Auth Screen</Text>
      <Button
        title="Forgot Password"
        onPress={() => props.navigation.navigate(ForgotPassword)}
      />
      <Button
        title="Profile"
        onPress={() => props.navigation.navigate(Profile)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Auth;
