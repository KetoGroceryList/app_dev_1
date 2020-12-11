import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as foodActions from '../../store/actions/foods';

import Colors from '../../constants/Colors';

const FoodDetails = (props) => {
  const foodName = props.route.params.name;
  const selectedFood = useSelector((state) =>
    state.foods.foods.data.find((food) => food.name === foodName)
  );

  const dispatch = useDispatch();

  const addFavHandler = (id) => {
    dispatch(foodActions.addFav(id));
  };

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedFood.imageUrl }} />
      <View style={styles.action}>
        <Text style={styles.title}>{foodName}</Text>
        <Button
          color={Colors.greenText}
          title="Add to favourites"
          onPress={() => addFavHandler(selectedFood._id)}
        />
      </View>
      {/* <Text style={styles.description}>{selectedProduct.description}</Text> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  action: {
    marginVertical: 10,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'nordin-regular',
    fontSize: 35,
    marginVertical: 1,
  },
});

export default FoodDetails;
