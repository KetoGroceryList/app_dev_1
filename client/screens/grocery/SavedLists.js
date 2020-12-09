import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SavedLists = (props) => {
  return (
    <View style={styles.container}>
      <Text>Saved Lists</Text>
      <Button
        title="List Details"
        onPress={() => props.navigation.navigate('Saved List Details')}
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

export default SavedLists;
