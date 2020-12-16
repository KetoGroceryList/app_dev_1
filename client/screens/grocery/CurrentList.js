import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Button,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import * as foodsActions from '../../store/actions/foods';
import Colors from '../../constants/Colors';

const CurrentList = (props) => {
  const foods = useSelector((state) => state.foods.foods.data);
  const [search, setSearch] = useState('');
  const [foodSelection, setFoodSelection] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(foodsActions.getFoods());
    dispatch(foodsActions.getFavs());
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={15}
      style={styles.screen}
    >
      <View style={styles.searchContainer}>
        <Text style={styles.searchLabel}>Search Food</Text>
        <TextInput
          id="search"
          keyboardType="default"
          autoCapitalize="none"
          value={search}
          onChangeText={(value) => setSearch(value)}
          style={styles.searchTextInput}
        />
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
  },
  searchLabel: {
    fontFamily: 'open-sans-bold',
    marginVertical: 5,
  },
  searchTextInput: {
    fontSize: 26,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  searchOptions: {
    fontFamily: 'open-sans-bold',
    marginVertical: 3,
  },
  searchOptionsText: {
    fontSize: 20,
  },
});

export default CurrentList;
