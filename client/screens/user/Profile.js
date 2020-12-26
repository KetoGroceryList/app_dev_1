import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CustomButton from '../../components/UI/CustomButton';
import Input from '../../components/UI/Input';
import * as authActions from '../../store/actions/auth';
import * as userActions from '../../store/actions/user';
import Colors from '../../constants/Colors';

const Profile = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [toReload, setToReLoad] = useState(false);

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      await dispatch(userActions.getUser());
      setIsLoading(false);
    };
    getUser();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ccc" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={15}
      style={styles.screen}
    >
      <View style={styles.profileContainer}>
        <Text style={styles.profileText}>name: {user ? user.name : null}</Text>
        <Text style={styles.profileText}>
          email: {user ? user.email : null}
        </Text>
        <ScrollView>
          <Input
            id="name"
            label="name"
            keyboardType="default"
            autoCapitalize="none"
            errorMessage="Please enter a name"
            onInputChange={() => {}}
            initialValue={user ? user.name : null}
          />
          <Input
            id="email"
            label="e-mail"
            keyboardType="email-address"
            email
            autoCapitalize="none"
            errorMessage="Please enter a valid email address"
            onInputChange={() => {}}
            initialValue={user ? user.email : null}
          />
          <Input
            id="password"
            label="password"
            keyboardType="default"
            secureTextEntry
            minLength={6}
            autoCapitalize="none"
            errorMessage="Please enter a password"
            onInputChange={() => {}}
            initialValue="password-string"
          />
          <View style={{ marginTop: 14 }}>
            <CustomButton
              color={Colors.greenText}
              onSelect={() => console.log('saving profile')}
            >
              <Text style={styles.buttonText}>Update Profile</Text>
            </CustomButton>
          </View>
        </ScrollView>
      </View>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  profileContainer: {
    flex: 1,
    marginVertical: 15,
    justifyContent: 'center',
  },
  profileText: {
    fontSize: 18,
    fontFamily: 'open-sans',
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
