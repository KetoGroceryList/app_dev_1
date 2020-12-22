import React from 'react';
import {
  View,
  Text,
  Button,
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
    <View>
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
    backgroundColor: Colors.greenText,
    borderRadius: 10,
  },
});

export default CustomButton;
