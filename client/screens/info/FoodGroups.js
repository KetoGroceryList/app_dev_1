import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const FoodGroups = (props) => {
  return (
    <View style={styles.container}>
      <Text>Food Groups</Text>
      <Button
        title="Food Group Items"
        onPress={() => {
          props.navigation.navigate('Food Group Items');
        }}
      />
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

export default FoodGroups;
