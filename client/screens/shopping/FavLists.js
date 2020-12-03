import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FavList = (props) => {
  return (
    <View style={styles.container}>
      <Text>Favourite Lists</Text>
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

export default FavList;
