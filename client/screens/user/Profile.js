import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Profile = (props) => {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button
        title="Reset Password"
        onPress={() => {
          props.navigation.navigate('ResetPassword');
        }}
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

export default Profile;
