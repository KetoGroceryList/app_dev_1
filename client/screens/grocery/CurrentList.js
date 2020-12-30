import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
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

import CustomButton from '../../components/UI/CustomButton';
import * as foodsActions from '../../store/actions/foods';
import Colors from '../../constants/Colors';

const CurrentList = (props) => {
  const foods = useSelector((state) => state.foods.foods);
  const groceryLists = useSelector((state) => state.foods.groceryLists);
  let mutableGroceryLists = useSelector(
    (state) => state.foods.mutableGroceryLists
  );
  // const currentListId = useSelector((state) => state.foods.currentListId);
  // console.log(currentListId);

  let listLoaded;

  const dispatch = useDispatch();

  //which route.params should component use
  if (props.route.params) {
    if (props.route.params.listId) {
      listLoaded = props.route.params;
    } else if (props.route.params.mutableGroceryLists) {
      mutableGroceryLists = mutableGroceryLists;
    }
  }

  const [search, setSearch] = useState('');
  const [foodSelection, setFoodSelection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [toReload, setToReLoad] = useState(false);
  const [fadedItems, setFadedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [listName, setListName] = useState(null);

  const windowHeight = useWindowDimensions().height;

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
  let loadedFoodsList;
  let lastModifiedList;
  let listFoods = []; //listFoods will depend on whether a saved list (listLoaded) is chosen
  let listFoodsName;
  let listFoodsId;
  let foodItemsData = []; //data for Flatlist in JSX

  //look for the latest lastModified grocery list
  const sortLastModified = (lists) => {
    for (let i = 0; i < lists.length - 1; i++) {
      for (let j = 0; j < lists.length - 1; j++) {
        if (lists[j].lastModifiedAt < lists[j + 1].lastModifiedAt) {
          [lists[j + 1], lists[j]] = [lists[j], lists[j + 1]];
        }
      }
    }
    return lists[0];
  };

  if (listLoaded && !isLoading) {
    loadedFoodsList = mutableGroceryLists.find(
      (list) => list._id === listLoaded.listId
    );
    listFoods = loadedFoodsList.groceryListArray; //if user loads a saved list
    listFoodsName = loadedFoodsList.name;
    listFoodsId = loadedFoodsList._id;
  } else if (!listLoaded && !isLoading) {
    lastModifiedList = sortLastModified(mutableGroceryLists);
    listFoods = lastModifiedList.groceryListArray; //default list - user's latest modified list
    listFoodsName = lastModifiedList.name;
    listFoodsId = lastModifiedList._id;
  }

  useEffect(() => {
    if (listFoodsId) {
      dispatch(foodsActions.setCurrentList(listFoodsId));
    }
  }, [listFoodsId]);

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
    //need to empty listLoaded if user is saving a new list,
    //so the default would go to the latest saved list
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

  //listName would be null if user doesn't change list name input field
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
          <CustomButton
            title="Try again"
            onSelect={loadData}
            color={Colors.greenText}
          >
            <Text style={styles.buttonText}>Try Again</Text>
          </CustomButton>
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
            keyboardType="default"
            autoCapitalize="none"
            maxLength={25}
            value={search.toLowerCase()}
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
                    style={{ marginRight: 7, opacity: 0.7 }}
                    size={36}
                    onPress={() => {
                      fadedItems.includes(itemData.item._id)
                        ? removeFoodFromFadedHandler(itemData.item.name)
                        : addFoodToFadedHandler(itemData.item.name);
                    }}
                  />
                  <Ionicons
                    name="close-circle-outline"
                    style={{ opacity: 0.7 }}
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
          <CustomButton
            color={Colors.greenText}
            onSelect={() => {
              setModalVisible(true);
            }}
          >
            <Text style={styles.buttonText}>Save List</Text>
          </CustomButton>
          <CustomButton
            color={Colors.greenText}
            onSelect={() => {
              props.navigation.navigate('Saved Lists');
            }}
          >
            <Text style={styles.buttonText}>Load Lists</Text>
          </CustomButton>
        </View>
      </View>
      <View style={styles.centered}>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centered}>
            <View style={styles.modalView}>
              <Text style={styles.modalLabel}>Save your list</Text>
              <TextInput
                id="listName"
                keyboardType="default"
                autoCapitalize="none"
                fontFamily="open-sans"
                defaultValue={listFoodsName}
                value={listName}
                maxLength={25}
                onChangeText={(text) => setListName(text)}
                style={styles.searchTextInput}
              />
              <View style={styles.modalButtonContainer}>
                <CustomButton
                  color={Colors.greenText}
                  onSelect={() => {
                    updateExistingListHandler(
                      foodItemsData,
                      listNameToBeUpdated,
                      listFoodsId
                    );
                    setModalVisible(!modalVisible);
                    setListName(null);
                  }}
                >
                  <Text style={styles.smallButtonText}>Save</Text>
                </CustomButton>
                {groceryLists.length < 10 ? (
                  <CustomButton
                    color={Colors.greenText}
                    onSelect={() => {
                      saveNewListHandler(foodItemsData, listName);
                      setModalVisible(!modalVisible);
                      setListName(null);
                    }}
                  >
                    <Text style={styles.smallButtonText}>Save as</Text>
                  </CustomButton>
                ) : null}
                <CustomButton
                  color={Colors.greenText}
                  onSelect={() => {
                    setModalVisible(!modalVisible);
                    setListName(null);
                  }}
                >
                  <Text style={styles.smallButtonText}>Cancel</Text>
                </CustomButton>
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
    fontSize: 24,
    fontFamily: 'open-sans',
    color: '#111',
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
  buttonText: {
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 15,
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    color: 'white',
  },
  smallButtonText: {
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 9,
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    color: 'white',
  },
});

export default CurrentList;
