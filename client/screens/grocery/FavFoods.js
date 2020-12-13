import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import FoodCard from '../../components/UI/FoodCard';

const FavFoods = (props) => {
  const foods = useSelector((state) => state.foods.foods.data);
  const favFoods = useSelector((state) => state.foods.favFoods);

  const favFoodsFullData = [];

  //console.log(foods);
  //console.log(favFoods);

  const search = (foods, favFoods) => {
    for (let i = 0; i < foods.length; i++) {
      for (let j = 0; j < favFoods.length; j++) {
        if (foods[i]._id === favFoods[j]) {
          favFoodsFullData.push(foods[i]);
        }
      }
      if (favFoodsFullData.length === favFoods.length) {
        return;
      }
    }
  };

  search(foods, favFoods);

  const selectFoodDetailsHandler = (name) => {
    props.navigation.navigate('Food Details', {
      name,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favFoodsFullData}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <FoodCard
            image={itemData.item.imageUrl}
            title={itemData.item.name}
            onSelect={() => selectFoodDetailsHandler(itemData.item.name)}
          />
        )}
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
});

export default FavFoods;
