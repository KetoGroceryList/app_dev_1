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
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as foodsActions from '../../store/actions/foods';
import Colors from '../../constants/Colors';

const CurrentList = (props) => {
  const foods = useSelector((state) => state.foods.foods);
  const groceryLists = useSelector((state) => state.foods.groceryLists);
  let listLoaded = props.route.params;

  const [search, setSearch] = useState('');
  const [foodSelection, setFoodSelection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [toReload, setToReLoad] = useState(false);
  const [fadedItems, setFadedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [listName, setListName] = useState(null);

  const windowHeight = useWindowDimensions().height;

  const dispatch = useDispatch();

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
    setIsLoading(true);
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

  /** Main Logic To Load Grocery List*/
  let loadedListId;
  let loadedListName;
  let loadedFoodsList;
  let lastGroceryList;
  let lastGroceryListName;
  let listFoods = []; //listFoods will depend on whether a saved list (listLoaded) is chosen
  let listFoodsName;
  let listFoodsId;
  let foodItemsData = [];

  if (listLoaded && !isLoading) {
    loadedListId = listLoaded.listId;
    loadedListName = listLoaded.listName;
    loadedFoodsList = groceryLists.find((list) => list._id === loadedListId);
    listFoods = loadedFoodsList.groceryListArray; //if user loads a saved list
    listFoodsName = loadedFoodsList.name;
    listFoodsId = loadedFoodsList._id;
  } else if (!listLoaded && !isLoading) {
    lastGroceryList = groceryLists[groceryLists.length - 1];
    lastGroceryListName = lastGroceryList.name;
    listFoods = lastGroceryList.groceryListArray; //default list user's latest list
    listFoodsName = lastGroceryList.name;
    listFoodsId = lastGroceryList._id;
  }

  const foodItemsDataFn = (list, foods) => {
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < foods.length; j++) {
        if (list[i] === foods[j]._id) {
          foodItemsData.push(foods[j]);
        }
      }
      if (foodItemsData.length === list.length) return;
    }
  };
  foodItemsDataFn(listFoods, foods);

  /** End of Main Logic */

  const selectFoodDetailsHandler = (name) => {
    props.navigation.navigate('Food Details', {
      name,
    });
  };

  const addToListHandler = (food) => {
    if (listFoods.includes(food._id)) {
      Alert.alert('Notice', 'You already have this on your list', {
        text: 'Ok',
      });
      return;
    }
    listFoods.push(food._id);
    setSearch('');
  };

  const removeFromListHandler = (foodName) => {
    const foodIdToLocate = foods.find((food) => food.name === foodName);
    const index = listFoods.indexOf(foodIdToLocate._id);
    listFoods.splice(index, 1);
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

  const updateExistingListHandler = async (foods, name, id) => {
    try {
      setIsLoading(true);
      await dispatch(foodsActions.updateExistingList(foods, name, id));
      await dispatch(foodsActions.getSavedLists());
      setToReLoad((prevState) => !prevState);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const saveNewListHandler = async (foods, name) => {
    listLoaded = null;
    const date = Date.now();
    const dateInterm = new Date(date);
    const dateString = dateInterm.toLocaleDateString();
    if (!name) {
      name = dateString;
    }
    try {
      setIsLoading(true);
      await dispatch(foodsActions.saveNewList(foods, name));
      await dispatch(foodsActions.getSavedLists());
      setToReLoad((prevState) => !prevState);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  let listNameToBeUpdated;
  if (!listName) {
    listNameToBeUpdated = listFoodsName;
  } else {
    listNameToBeUpdated = listName;
  }

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
            maxLength={25}
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
        <View
          style={[
            styles.groceryList,
            {
              maxHeight:
                windowHeight < 700 ? windowHeight * 0.48 : windowHeight * 0.55,
            },
          ]}
        >
          <Text style={styles.listHeader}>{listFoodsName}</Text>
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
                    size={36}
                    onPress={() => {
                      fadedItems.includes(itemData.item._id)
                        ? removeFoodFromFadedHandler(itemData.item.name)
                        : addFoodToFadedHandler(itemData.item.name);
                    }}
                  />
                  <Ionicons
                    name="close-circle-outline"
                    size={36}
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
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centered}>
            <View style={styles.modalView}>
              <Text style={styles.modalLabel}>
                To save to new list, click 'Save As'
              </Text>
              <TextInput
                id="listName"
                keyboardType="default"
                autoCapitalize="none"
                defaultValue={listFoodsName}
                value={listName}
                maxLength={15}
                onChangeText={(text) => setListName(text)}
                style={styles.searchTextInput}
              />
              <View style={styles.modalButtonContainer}>
                <Button
                  title="Update"
                  onPress={() => {
                    updateExistingListHandler(
                      foodItemsData,
                      listNameToBeUpdated, //listName
                      listFoodsId
                    );
                    setModalVisible(!modalVisible);
                    setListName(null);
                  }}
                />
                <Button
                  title="Save As"
                  onPress={() => {
                    saveNewListHandler(foodItemsData, listName);
                    setModalVisible(!modalVisible);
                    setListName(null);
                  }}
                />
                <Button
                  title="Cancel"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setListName(null);
                  }}
                />
              </View>
            </View>
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
    marginVertical: 18,
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
    zIndex: 2,
    opacity: 0.98,
    alignContent: 'center',
  },
  searchLabel: {
    fontFamily: 'open-sans-bold',
    marginVertical: 6,
    paddingTop: 5,
    fontSize: 20,
  },
  searchTextInput: {
    fontSize: 20,
    fontFamily: 'open-sans',
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: '100%',
    paddingLeft: 4,
  },
  searchOptions: {
    fontFamily: 'open-sans',
    marginTop: 8,
    marginVertical: 3,
  },
  searchOptionsText: {
    fontSize: 20,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  groceryList: {
    zIndex: 0,
    position: 'absolute',
    top: 110,
  },
  listHeader: {
    marginBottom: 4,
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: 'open-sans-bold',
  },
  line: {
    width: 300,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    paddingBottom: 12,
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
    top: -6,
  },
  listText: {
    fontSize: 24,
    fontFamily: 'open-sans',
  },
  bottomSection: {
    height: 50,
    width: 300,
    position: 'absolute',
    bottom: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    zIndex: 1,
    width: '100%',
    opacity: 0.98,
    justifyContent: 'space-between',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: 300,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalLabel: {
    fontSize: 15,
    fontFamily: 'open-sans-bold',
    marginVertical: 5,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    zIndex: 1,
    width: '100%',
    opacity: 0.98,
    marginTop: 12,
    justifyContent: 'space-between',
  },
});

export default CurrentList;
