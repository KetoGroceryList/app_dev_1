import React from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import Colors from '../../constants/Colors';

const CustomButton = (props) => {
  let TouchableCmp = TouchableOpacity;

  Platform.OS === 'android' && Platform.Version >= 21
    ? (TouchableCmp = TouchableNativeFeedback)
    : TouchableOpacity;

  return (
    <View style={styles.androidCustomButton}>
      <TouchableCmp
        style={{ ...styles.customButton, ...props.style }}
        onPress={props.onSelect}
      >
        {props.children}
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  customButton: {
    // backgroundColor: Colors.greenText,
    // borderRadius: 10,
    // shadowColor: '#aaa',
    // shadowOpacity: 0.3,
    // shadowOffset: { width: 0, height: 3 },
    // shadowRadius: 5,
    // elevation: 3,
  },
  androidCustomButton: {
    backgroundColor: Colors.greenText,
    borderRadius: 10,
    shadowColor: '#888',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
});

export default CustomButton;
