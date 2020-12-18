import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Button,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as foodsActions from '../../store/actions/foods';
import Colors from '../../constants/Colors';

const CurrentList = (props) => {
  const foods = useSelector((state) => state.foods.foods);
  const groceryList = useSelector((state) => state.foods.groceryList);

  const [search, setSearch] = useState('');
  const [foodSelection, setFoodSelection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [toReload, setToReLoad] = useState(false);
  const [fadedItems, setFadedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const loadData = async () => {
    setError(null);
    try {
      await dispatch(foodsActions.getFoods());
      await dispatch(foodsActions.getFavs()); //should move this to favourites
      await dispatch(foodsActions.getSavedLists());
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadData().then(() => {
      setIsLoading(false);
    });
  }, []);

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

  const selectFoodDetailsHandler = (name) => {
    props.navigation.navigate('Food Details', {
      name,
    });
  };

  const addToListHandler = (food) => {
    if (lastGroceryList.groceryListArray.includes(food._id)) {
      Alert.alert('Notice', 'You already have this on your list', {
        text: 'Ok',
      });
      return;
    }
    lastGroceryList.groceryListArray.push(food._id);
    setSearch('');
  };

  const removeFromListHandler = (foodName) => {
    const foodIdToLocate = foods.find((food) => food.name === foodName);
    lastGroceryList.groceryListArray = lastGroceryList.groceryListArray.filter(
      (food) => food !== foodIdToLocate._id
    );
    setToReLoad((prevState) => !prevState);
  };

  const addFoodToFadedHandler = (foodName) => {
    const foodIdToLocate = foods.find((food) => food.name === foodName);
    setFadedItems((fadedItems) => [...fadedItems, foodIdToLocate._id]);
  };

  const removeFoodFromFadedHandler = (foodName) => {
    const foodIdToLocate = foods.find((food) => food.name === foodName);
    setFadedItems((fadedItems) =>
      fadedItems.filter((item) => item !== foodIdToLocate._id)
    );
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
        <ActivityIndicator size="large" color="#ccc" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={15}
      style={styles.screen}
    >
      <View style={styles.container}>
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
                        onPress={() => addToListHandler(food)}
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
          <View style={styles.line}></View>
          <FlatList
            data={foodItemsData}
            keyExtractor={(item) => item._id}
            renderItem={(itemData) => (
              <View
                style={
                  fadedItems.includes(itemData.item._id)
                    ? styles.listItemContainerGrey
                    : styles.listItemContainerWhite
                }
              >
                <Text
                  style={styles.listText}
                  onPress={() => selectFoodDetailsHandler(itemData.item.name)}
                >
                  {itemData.item.name}
                </Text>
                <View style={styles.listItemContainerChecks}>
                  <Ionicons
                    name="basket-outline"
                    style={{ marginRight: 7 }}
                    size={40}
                    onPress={() => {
                      fadedItems.includes(itemData.item._id)
                        ? removeFoodFromFadedHandler(itemData.item.name)
                        : addFoodToFadedHandler(itemData.item.name);
                    }}
                  />
                  <Ionicons
                    name="close-circle-outline"
                    size={40}
                    onPress={() => removeFromListHandler(itemData.item.name)}
                  />
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.buttonContainer}>
          <Button
            title="Save List"
            color={Colors.greenText}
            onPress={() => {
              setModalVisible(true);
            }}
          />
          <Button
            title="Load Lists"
            color={Colors.greenText}
            onPress={() => {
              props.navigation.navigate('Saved Lists');
            }}
          />
        </View>
      </View>
      <View style={styles.centered}>
        <Modal transparent={true} visible={modalVisible}>
          <View style={{ height: 500 }}>
            <Text>Hello</Text>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  listText: {
    color: Colors.greenText,
  },
  container: {
    flex: 4,
    width: 300,
    marginVertical: 22,
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
    zIndex: 1,
    opacity: 0.98,
  },
  searchLabel: {
    fontFamily: 'open-sans-bold',
    marginVertical: 6,
    paddingTop: 5,
    fontSize: 20,
    alignSelf: 'center',
  },
  searchTextInput: {
    fontSize: 22,
    fontFamily: 'open-sans',
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  searchOptions: {
    fontFamily: 'open-sans',
    marginTop: 10,
    marginVertical: 3,
  },
  searchOptionsText: {
    fontSize: 22,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  groceryList: {
    zIndex: 0,
    position: 'absolute',
    top: 90,
  },
  listHeader: {
    marginTop: 34,
    marginBottom: 7,
    fontSize: 22,
    alignSelf: 'center',
    fontFamily: 'open-sans-bold',
  },
  line: {
    width: '100%',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    marginBottom: 16,
  },
  listItemContainerGrey: {
    flexDirection: 'row',
    opacity: 0.15,
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 3,
  },
  listItemContainerWhite: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 3,
  },
  listItemContainerChecks: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    top: -7,
  },
  listText: {
    fontSize: 24,
    fontFamily: 'open-sans',
  },
  bottomSection: {
    height: 60,
    width: 300,
    position: 'absolute',
    bottom: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    zIndex: 1,
    width: '100%',
    opacity: 0.98,
    justifyContent: 'space-between',
  },
});

export default CurrentList;
