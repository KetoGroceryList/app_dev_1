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

// export const currentListScreenOptions = (navData) => {
//   return {
//     headerTitle: "Today's List",
//     headerRight: () => (
//       <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
//         <Item
//           title="Info"
//           iconName="ios-person-outline"
//           onPress={() => {
//             navData.navigation.navigate('Profile');
//           }}
//           color={Colors.primary}
//         />
//       </HeaderButtons>
//     ),
//   };
// };

// const [isLoading, setIsLoading] = useState(false);
// const [isRefreshing, setIsRefreshing] = useState(false);
// const [error, setError] = useState(undefined);
// const foods = useSelector((state) => state.foods.allFoods);
// const dispatch = useDispatch();

// const loadFoods = useCallback(async () => {
//   setError(null);
//   setIsRefreshing(true);
//   try {
//     await dispatch(productsActions.getFoods());
//   } catch (err) {
//     setError(err.message);
//   }
//   setIsRefreshing(false);
// }, [dispatch, setIsLoading, setError]);

// useEffect(() => {
//   const unsubscribe = props.navigation.addListener('focus', loadFoods);
//   return () => {
//     unsubscribe;
//   };
// }, [loadFoods]);

// useEffect(() => {
//   setIsLoading(true);
//   loadFoods().then(() => {
//     setIsLoading(false);
//   });
// }, [dispatch, loadFoods]);

// if (error) {
//   return (
//     <View style={styles.centered}>
//       <Text>An error occurred.</Text>
//       <View style={{ margin: 5 }}>
//         <Button
//           title="Try again"
//           onPress={loadFoods}
//           color={Colors.primaryColor}
//         />
//       </View>
//     </View>
//   );
// }

// if (isLoading) {
//   return (
//     <View style={styles.centered}>
//       <ActivityIndicator size="large" color={Colors.primaryColor} />
//     </View>
//   );
// }

// if (!isLoading && products.length === 0) {
//   return (
//     <View style={styles.centered}>
//       <Text>No Foods found</Text>
//     </View>
//   );
// }

// const [foods, setFoods] = useState([]);

// useEffect(() => {
//   const getFoodsData = async () => {
//     const result = await axios('http://192.168.0.197:5000/api/foods');
//     setFoods(result.data.data);
//   };
//   getFoodsData();
// }, []);
