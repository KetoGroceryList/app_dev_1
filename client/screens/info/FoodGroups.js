import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { foodGroupsData } from '../../data/foodGroups';
import FoodCard from '../../components/UI/FoodCard';

const FoodGroups = (props) => {
  const selectGroupHandler = (foodGroup) => {
    props.navigation.navigate('Food Group Items', foodGroup);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={foodGroupsData}
        keyExtractor={(item) => item.group}
        renderItem={(itemData) => (
          <FoodCard
            image={itemData.item.imageUrl}
            title={itemData.item.group}
            onSelect={() => selectGroupHandler(itemData.item.group)}
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

export default FoodGroups;
