import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CustomButton from '../../components/UI/CustomButton';
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
          <CustomButton
            color={Colors.greenText}
            onSelect={() => {
              props.navigation.navigate('Contact Us');
            }}
          >
            <Text style={styles.buttonText}>Contact Us</Text>
          </CustomButton>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            color={Colors.greenText}
            onSelect={() => {
              dispatch(authActions.logout());
            }}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </CustomButton>
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
  buttonText: {
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 15,
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    color: 'white',
  },
});

export default Profile;
