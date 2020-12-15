import React, { useEffect } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as foodsActions from '../../store/actions/foods';

const SavedLists = (props) => {
  //array of lists - remember!
  const groceryLists = useSelector((state) => state.foods.groceryList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(foodsActions.getSavedLists());
  }, [dispatch]);

  console.log(groceryLists);

  return (
    <View style={styles.container}>
      <Text>Saved Lists</Text>
      {/* <FlatList
        data={groceryLists}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => <Text>{itemData.item.groceryListArray}</Text>}
      /> */}
      <ScrollView>
        {groceryLists
          ? groceryLists.map((list) => (
              <Text key={list.user}>
                {list.groceryListArray.map((food) => (
                  <View key={food}>
                    <Text>{food}</Text>
                  </View>
                ))}
              </Text>
            ))
          : null}
      </ScrollView>
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
  searchOptions: {
    fontFamily: 'open-sans-bold',
    marginVertical: 3,
  },
});

export default SavedLists;
