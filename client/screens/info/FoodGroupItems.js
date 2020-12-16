import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import FoodCard from '../../components/UI/FoodCard';

const FoodGroupItems = (props) => {
  const foodType = props.route.params;
  const groupFoods = useSelector((state) =>
    state.foods.foods.filter((group) => group.foodType === foodType)
  );

  const selectFoodDetailsHandler = (name) => {
    props.navigation.navigate('Food Details', {
      name,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={groupFoods}
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

export const foodGroupItemsScreenOptions = (navData) => {
  return {
    headerTitle: navData.route.params,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FoodGroupItems;
