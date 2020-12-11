import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as foodActions from '../../store/actions/foods';
import FoodCard from '../../components/UI/FoodCard';

const FoodGroupItems = (props) => {
  const foodType = props.route.params;
  const groupFoods = useSelector((state) =>
    state.foods.foods.data.filter((group) => group.foodType === foodType)
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
      <Button
        title="Food Details"
        onPress={() => props.navigation.navigate('Food Details')}
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

export default FoodGroupItems;
