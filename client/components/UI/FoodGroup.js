import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
} from 'react-native';

import Card from './Card';

const FoodGroup = (props) => {
  let TouchableCmp = TouchableOpacity;

  Platform.OS === 'android' && Platform.Version >= 21
    ? (TouchableCmp = TouchableNativeFeedback)
    : TouchableOpacity;

  return (
    <Card style={styles.foodGroup}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          {/* useForeground allows the touch ripple effect to reverberate across the card */}
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
            </View>
            {/* <View style={styles.actions}>{props.children}</View> */}
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  foodGroup: {
    height: 300,
    width: 300,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '82%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    alignItems: 'center',
    height: 50,
    padding: 10,
  },
  title: {
    fontFamily: 'open-sans',
    fontSize: 18,
    marginVertical: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20,
  },
});

export default FoodGroup;
