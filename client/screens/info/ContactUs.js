import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import Colors from '../../constants/Colors';

const ContactUs = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.heading}>Contact The Developer</Text>
        <Text>
          Hello, thank you for using my app. The best way to interact with me,
          the developer of this app, is through social media.
        </Text>
      </View>
      <View style={styles.socialsContainer}>
        <MaterialCommunityIcons
          name="facebook"
          size={65}
          color={Colors.facebook}
          style={styles.icon}
          onPress={() => Linking.openURL('fb://page/106848281418')}
          //fb://page/PAGE_ID
          //https://www.facebook.com/leonard.shen.1/
        />
        <MaterialCommunityIcons
          name="instagram"
          size={65}
          color={Colors.instagram}
          style={styles.icon}
          onPress={() =>
            Linking.openURL('http://instagram.com/_u/leonard.shen.1')
          }
        />
        <MaterialCommunityIcons
          name="twitter"
          size={65}
          color={Colors.twitter}
          style={styles.icon}
          onPress={() => console.log('twitter')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '80%',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'open-sans-bold',
    marginVertical: 6,
    paddingTop: 5,
    fontSize: 20,
  },
  socialsContainer: {
    flexDirection: 'row',
  },
  icon: {
    margin: 10,
  },
});

export default ContactUs;
