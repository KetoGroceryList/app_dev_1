import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FoodGroupItems = (props) => {
  return (
    <View style={styles.container}>
      <Text>Food Group Items</Text>
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

export default FoodGroupItems;
