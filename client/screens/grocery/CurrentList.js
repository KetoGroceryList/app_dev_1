import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';

import Colors from '../../constants/Colors';

const CurrentList = (props) => {
  return (
    <View style={styles.container}>
      <Text>Current List</Text>
      <Button
        title="Saved Lists"
        onPress={() => {
          props.navigation.navigate('Saved Lists');
        }}
      />
    </View>
  );
};

export const currentListScreenOptions = (navData) => {
  return {
    headerTitle: "Today's List",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Info"
          iconName="ios-person-outline"
          onPress={() => {
            navData.navigation.navigate('Profile');
          }}
          color={Colors.primary}
        />
      </HeaderButtons>
    ),
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

export default CurrentList;
