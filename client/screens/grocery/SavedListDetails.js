import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CustomButton from '../../components/UI/CustomButton';
import * as foodsAction from '../../store/actions/foods';

const SavedListDetails = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const restore = async () => {
      await dispatch(foodsAction.restoreMutableList());
    };
    restore();
  }, []);

  const listId = props.route.params.id;

  const foods = useSelector((state) => state.foods.foods);
  const groceryLists = useSelector((state) => state.foods.groceryLists);

  const list = useSelector((state) =>
    state.foods.groceryLists.find((list) => list._id === listId)
  );

  const dispatch = useDispatch();

  let foodItemsIds = [];
  let listName;

  if (list) {
    foodItemsIds = list.groceryListArray;
    listName = list.name;
  }

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

  const deleteListByIdHandler = async (listId) => {
    if (groceryLists.length === 1) {
      Alert.alert(
        'Stop!',
        'You only have one grocery list left. You cannot delete your last list.',
        [{ text: 'Cancel', style: 'cancel' }]
      );
      return;
    }
    try {
      setIsLoading(true);
      await dispatch(foodsAction.deleteListById(listId));
      setIsLoading(false);
      props.navigation.navigate('Current List');
    } catch (err) {
      setError(err.message);
    }
  };

  const bringListIdToFront = (listId, listName) => {
    props.navigation.navigate('Current List', {
      listId,
      listName,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 5, marginBottom: 10 }}>
        <CustomButton onSelect={() => bringListIdToFront(listId, listName)}>
          <Text style={styles.buttonText}>Use this list</Text>
        </CustomButton>
      </View>
      <FlatList
        data={foodItemsData}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <View style={styles.listFoodContainer}>
            <Text
              style={styles.listText}
              onPress={() => selectFoodDetailsHandler(itemData.item.name)}
            >
              {itemData.item.name}
            </Text>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.removeButton}
          onSelect={() => deleteListByIdHandler(listId)}
        >
          <Text style={styles.buttonText}>Delete this list</Text>
        </CustomButton>
      </View>
    </View>
  );
};

export const savedListDetailsScreenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.name,
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  listFoodContainer: {
    marginVertical: 5,
  },
  listText: {
    fontSize: 24,
    fontFamily: 'open-sans',
    color: '#111',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 15,
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    color: 'white',
  },
});

export default SavedListDetails;
