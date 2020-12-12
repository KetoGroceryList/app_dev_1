import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as authActions from '../../store/actions/auth';
import Colors from '../../constants/Colors';

const Profile = (props) => {
  const [profile, setProfile] = useState(null);
  const [favFoods, setFavFoods] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProfile = async () => {
      const result = await axios.get('http://192.168.0.197:5000/api/auth/me');
      const getFavFoods = await axios.get(
        'http://192.168.0.197:5000/api/favFoods/'
      );

      setProfile(result.data.data);

      if (getFavFoods.data.data.favFoodsArray === null) {
        return;
      }
      const foods = getFavFoods.data.data.favFoodsArray;
      setFavFoods(foods);
    };
    getProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Text>name: {profile ? profile.name : null}</Text>
      {favFoods
        ? favFoods.map((food) => (
            <View key={food}>
              <Text>{food}</Text>
            </View>
          ))
        : null}
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
