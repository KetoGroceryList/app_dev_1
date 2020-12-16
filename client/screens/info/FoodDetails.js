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
import { PieChart } from 'react-native-svg-charts';
import * as svg from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as foodActions from '../../store/actions/foods';
import Colors from '../../constants/Colors';

const FoodDetails = (props) => {
  const foodName = props.route.params.name;
  const selectedFood = useSelector((state) =>
    state.foods.foods.find((food) => food.name === foodName)
  );
  const favFoods = useSelector((state) => state.foods.favFoods);

  let favOrNot = false;

  if (favFoods.includes(selectedFood._id)) {
    favOrNot = true;
  }

  const dispatch = useDispatch();

  const favHandler = (id) => {
    if (!favOrNot) {
      dispatch(foodActions.addFav(id));
    } else {
      dispatch(foodActions.deleteFav(id));
    }
  };

  const data = [
    {
      key: 1,
      name: 'protein',
      amount: selectedFood.protein,
      svg: { fill: Colors.purple },
    },
    {
      key: 2,
      name: 'fats',
      amount: selectedFood.fats,
      svg: { fill: Colors.pink },
    },
    {
      key: 3,
      name: 'fiber',
      amount: selectedFood.fiber,
      svg: { fill: Colors.green },
    },
    {
      key: 4,
      name: 'net carbs',
      amount: selectedFood.netCarbs,
      svg: { fill: Colors.orange },
    },
  ];

  const Labels = ({ slices, height, width }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <svg.Text
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={'white'}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={19}
          stroke={'black'}
          strokeWidth={0.1}
        >
          {data.amount > 0 ? data.amount + `g` : null}
        </svg.Text>
      );
    });
  };

  return (
    <ScrollView>
      <View style={{ backgroundColor: '#fff' }}>
        <Image style={styles.image} source={{ uri: selectedFood.imageUrl }} />
        <View style={styles.action}>
          <Text style={styles.title}>{foodName}</Text>
          <Button
            color={Colors.greenText}
            title={favOrNot ? 'Remove from favourites' : 'Add to favourites'}
            onPress={() => favHandler(selectedFood._id)}
          />
        </View>
        <View style={styles.legendContainer}>
          <View style={styles.legendInnerContainer}>
            <View style={styles.legendRow}>
              <View style={styles.macroContainer}>
                <MaterialCommunityIcons
                  name="rectangle"
                  size={30}
                  color={Colors.purple}
                />
                <Text style={styles.textPosition}>Protein</Text>
              </View>
              <View style={styles.macroContainer}>
                <MaterialCommunityIcons
                  name="rectangle"
                  size={30}
                  color={Colors.pink}
                />
                <Text style={styles.textPosition}>Fats</Text>
              </View>
            </View>
            <View style={styles.legendRow}>
              <View style={styles.macroContainer}>
                <MaterialCommunityIcons
                  name="rectangle"
                  size={30}
                  color={Colors.green}
                />
                <Text style={styles.textPosition}>Fiber</Text>
              </View>
              <View style={styles.macroContainer}>
                <MaterialCommunityIcons
                  name="rectangle"
                  size={30}
                  color={Colors.orange}
                />
                <Text style={styles.textPosition}>Net Carbs</Text>
              </View>
            </View>
          </View>
          <Text style={{ marginTop: 20 }}>per 100g</Text>
        </View>
        <View></View>
        <PieChart
          style={{ height: 250 }}
          valueAccessor={({ item }) => item.amount}
          data={data}
          spacing={1}
          outerRadius={'95%'}
        >
          <Labels />
        </PieChart>
      </View>
    </ScrollView>
  );
};

export const foodDetailsScreenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.name,
  };
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
  legendContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  legendInnerContainer: {
    width: 250,
  },
  legendRow: {
    flex: 1,
    flexDirection: 'row',
  },
  macroContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textPosition: {
    top: 7,
    paddingLeft: 5,
  },
});

export default FoodDetails;
