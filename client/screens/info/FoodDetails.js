import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FoodDetails = (props) => {
  return (
    <View style={styles.container}>
      <Text>Food Details</Text>
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

export default FoodDetails;
