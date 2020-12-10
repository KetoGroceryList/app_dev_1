import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { foodGroupsData } from '../../data/foodGroups';
import FoodGroup from '../../components/UI/FoodGroup';

const FoodGroups = (props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={foodGroupsData}
        keyExtractor={(item) => item.group}
        renderItem={(itemData) => (
          <FoodGroup
            image={itemData.item.imageUrl}
            title={itemData.item.group}
            onSelect={() => console.log('onSelect')}
          />
        )}
      />
      {/* <Button
        title="Food Group Items"
        onPress={() => {
          props.navigation.navigate('Food Group Items');
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FoodGroups;
