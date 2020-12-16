import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Button,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import Card from '../../components/UI/Card';
import * as foodsActions from '../../store/actions/foods';
import Colors from '../../constants/Colors';

const CurrentList = (props) => {
  const foods = useSelector((state) => state.foods.foods);
  const groceryList = useSelector((state) => state.foods.groceryList);

  const [search, setSearch] = useState('');
  const [foodSelection, setFoodSelection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);

  const dispatch = useDispatch();

  let lastGroceryList = {};
  let lastGroceryListFoods = [];

  if (!isLoading) {
    lastGroceryList = groceryList[groceryList.length - 1];
    lastGroceryListFoods = lastGroceryList.groceryListArray;
  }

  const foodItemsData = [];
  const foodItemsDataFn = (lastGroceryListFoods, foods) => {
    for (let i = 0; i < lastGroceryListFoods.length; i++) {
      for (let j = 0; j < foods.length; j++) {
        if (lastGroceryListFoods[i] === foods[j]._id) {
          foodItemsData.push(foods[j]);
        }
      }
      if (foodItemsData.length === lastGroceryListFoods.length) return;
    }
  };

  foodItemsDataFn(lastGroceryListFoods, foods);

  const loadData = async () => {
    setError(null);
    try {
      await dispatch(foodsActions.getFoods());
      await dispatch(foodsActions.getFavs());
      await dispatch(foodsActions.getSavedLists());
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadData().then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    let options;
    if (search.length === 0) {
      options = '';
      setFoodSelection(options);
    }
    if (search.length > 1) {
      options = foods.filter((food) => food.name.includes(search));
      setFoodSelection(options);
    }
  }, [search]);

  const selectFoodDetailsHandler = (name) => {
    props.navigation.navigate('Food Details', {
      name,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred.</Text>
        <View style={{ margin: 5 }}>
          <Button
            title="Try again"
            onPress={loadData}
            color={Colors.greenText}
          />
        </View>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={15}
      style={styles.screen}
    >
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchLabel}>Search Food</Text>
          <TextInput
            id="search"
            keyboardType="default"
            autoCapitalize="none"
            value={search}
            onChangeText={(value) => setSearch(value)}
            style={styles.searchTextInput}
          />
          <View style={{ marginBottom: 20 }}>
            <ScrollView>
              {foodSelection
                ? foodSelection.map((food) => (
                    <View key={food._id} style={styles.searchOptions}>
                      <Text
                        style={styles.searchOptionsText}
                        onPress={() => console.log(food.name)}
                      >
                        {food.name}
                      </Text>
                    </View>
                  ))
                : null}
            </ScrollView>
          </View>
        </View>

        <View style={styles.groceryList}>
          <Text style={styles.listHeader}>Your grocery list</Text>
          <FlatList
            data={foodItemsData}
            keyExtractor={(item) => item._id}
            renderItem={(itemData) => (
              <View style={styles.listItemContainer}>
                <Text
                  style={styles.listText}
                  onPress={() => selectFoodDetailsHandler(itemData.item.name)}
                >
                  {itemData.item.name}
                </Text>
                <View style={styles.listItemContainerChecks}>
                  <Ionicons name="checkmark-circle-outline" size={42} />
                  <Ionicons name="close-circle-outline" size={42} />
                </View>
              </View>
            )}
          />
        </View>
        <Button
          title="Saved Lists"
          onPress={() => {
            props.navigation.navigate('Saved Lists');
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  listText: {
    color: Colors.greenText,
  },
  searchContainer: {
    width: 300,
    marginVertical: 30,
    zIndex: 100,
    position: 'absolute',
  },
  searchInputContainer: {
    paddingHorizontal: 20,
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  searchLabel: {
    fontFamily: 'open-sans-bold',
    marginVertical: 5,
    paddingTop: 10,
    fontSize: 20,
  },
  searchTextInput: {
    fontSize: 26,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  searchOptions: {
    fontFamily: 'open-sans',
    marginVertical: 3,
  },
  searchOptionsText: {
    fontSize: 20,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  groceryList: {},
  listHeader: {
    marginVertical: 20,
    fontSize: 24,
    fontFamily: 'open-sans-bold',
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  listItemContainerChecks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: -5,
  },
  listText: {
    fontSize: 24,
    fontFamily: 'open-sans',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CurrentList;
