import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as authActions from '../../store/actions/auth';
import * as userActions from '../../store/actions/user';
import Colors from '../../constants/Colors';

const Profile = (props) => {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.getUser());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text>name: {user ? user.name : null}</Text>
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
