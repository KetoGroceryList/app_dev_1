import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import * as authActions from '../../store/actions/auth';
import Colors from '../../constants/Colors';

const Profile = (props) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <View>
        <View style={styles.buttonContainer}>
          <Button
            title="Contact Us"
            style={styles.button}
            color={Colors.greenText}
            onPress={() => {
              props.navigation.navigate('Contact Us');
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Logout"
            color={Colors.greenText}
            onPress={() => {
              dispatch(authActions.logout());
            }}
          />
        </View>
      </View>
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
  buttonContainer: {
    marginVertical: 4,
  },
});

export default Profile;
