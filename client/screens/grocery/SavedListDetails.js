import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';

const SavedListDetails = (props) => {
  const listId = props.route.params.id;
  const list = useSelector((state) =>
    state.foods.groceryLists.find((list) => list._id === listId)
  );
  const foodItemsIds = list.groceryListArray;
  const foods = useSelector((state) => state.foods.foods);

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

  const selectFoodDetailsHandler = (name) => {
    props.navigation.navigate('Food Details', {
      name,
    });
  };

  const bringListIdToFront = (listId) => {
    props.navigation.navigate('Current List', {
      listId,
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 10 }}>
        <Button
          style={styles.button}
          title="Use this list for today"
          onPress={() => bringListIdToFront(listId)}
        />
      </View>
      <FlatList
        data={foodItemsData}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <View style={styles.listFoodContainer}>
            <Text
              style={styles.listFoodText}
              onPress={() => selectFoodDetailsHandler(itemData.item.name)}
            >
              {itemData.item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export const savedListDetailsScreenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.name,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  button: {
    fontFamily: 'open-sans',
  },
  listFoodContainer: {
    marginVertical: 5,
  },
  listFoodText: {
    fontSize: 20,
    fontFamily: 'open-sans',
  },
});

export default SavedListDetails;
