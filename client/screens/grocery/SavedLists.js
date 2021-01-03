import React, { useEffect } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import CustomButton from '../../components/UI/CustomButton';

const SavedLists = (props) => {
  let TouchableCmp = TouchableOpacity;

  Platform.OS === 'android' && Platform.Version >= 21
    ? (TouchableCmp = TouchableNativeFeedback)
    : TouchableOpacity;
  const groceryLists = useSelector((state) => state.foods.groceryLists);

  const selectListHandler = (id, name) => {
    props.navigation.navigate('Saved List Details', { id, name });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}></View>
      <FlatList
        data={groceryLists}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <View style={styles.listLabel}>
            <CustomButton
              onSelect={() =>
                selectListHandler(itemData.item._id, itemData.item.name)
              }
              useForeground
            >
              <Text style={styles.listText}>{itemData.item.name}</Text>
            </CustomButton>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    marginTop: 20,
  },
  listLabel: {
    width: 300,
    backgroundColor: Colors.greenText,
    marginVertical: 8,
    borderRadius: 10,
  },
  listText: {
    fontSize: 20,
    paddingVertical: 12,
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    color: 'white',
  },
});

export default SavedLists;
