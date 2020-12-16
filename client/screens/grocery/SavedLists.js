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

import Colors from '../../constants/Colors';
import * as foodsActions from '../../store/actions/foods';

const SavedLists = (props) => {
  const groceryLists = useSelector((state) => state.foods.groceryList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(foodsActions.getSavedLists());
  }, [dispatch]);

  const selectListHandler = (id, name) => {
    props.navigation.navigate('Saved List Details', [id, name]);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}></View>
      <ScrollView>
        {groceryLists
          ? groceryLists.map((list) => (
              <View key={list._id} style={styles.listLabel}>
                <Text
                  style={styles.listText}
                  onPress={() => selectListHandler(list._id, list.name)}
                >
                  {list.name}
                </Text>
              </View>
            ))
          : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    marginTop: 20,
  },
  searchOptions: {
    fontFamily: 'open-sans-bold',
    marginVertical: 3,
  },
  listLabel: {
    width: 300,
    backgroundColor: Colors.greenText,
    marginVertical: 8,
    alignItems: 'center',
    borderRadius: 15,
  },
  listText: {
    fontSize: 20,
    paddingVertical: 10,
    color: 'white',
  },
});

export default SavedLists;
