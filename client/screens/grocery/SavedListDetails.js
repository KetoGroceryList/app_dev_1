import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SavedListDetails = (props) => {
  return (
    <View style={styles.container}>
      <Text>Saved List Details</Text>
      <Button
        title="Food Details"
        onPress={() => props.navigation.navigate('Food Details')}
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

export default SavedListDetails;
