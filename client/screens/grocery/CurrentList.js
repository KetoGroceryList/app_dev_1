import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as foodsActions from '../../store/actions/foods';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const CurrentList = (props) => {
  //const foods = useSelector((state) => state.foods.foods);
  const [food, setFood] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://192.168.0.197:5000/api/foods');

      setFood(result.data);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Current List</Text>
      <FlatList
        data={food.data}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => <Text>{itemData.item.name}</Text>}
      />
      <Button
        title="Saved Lists"
        onPress={() => {
          props.navigation.navigate('Saved Lists');
        }}
      />
    </View>
  );
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
  },
  listText: {
    color: Colors.greenText,
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
