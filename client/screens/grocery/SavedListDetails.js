import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';

const SavedListDetails = (props) => {
  const listId = props.route.params[0];
  const list = useSelector((state) =>
    state.foods.groceryList.find((list) => list._id === listId)
  );
  const foodItemsIds = list.groceryListArray;
  const foods = useSelector((state) => state.foods.foods.data);

  //console.log(foodItemsIds);

  const foodItemsData = [];
  const foodItemsDataFn = (foodItemsIds, foods) => {
    for (let i = 0; i < foodItemsIds.length; i++) {
      for (let j = 0; j < foods.length; j++) {
        if (foodItemsIds[i] === foods[j]._id) {
          foodItemsData.push(foods[j]);
        }
      }
      if (foodItemsData.length === foodItemsIds.length) return;
    }
  };

  foodItemsDataFn(foodItemsIds, foods);
  console.log(foodItemsData);

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

export const savedListDetailsScreenOptions = (navData) => {
  return {
    headerTitle: navData.route.params[1],
  };
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
