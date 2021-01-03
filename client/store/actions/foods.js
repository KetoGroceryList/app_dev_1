import axios from 'axios';
import {
  SET_FOODS,
  ADD_FAV,
  GET_FAVS,
  DEL_FAV,
  SAVE_LIST,
  GET_LISTS,
  GET_MUTABLE_LISTS,
  RESTORE_MUTABLE_LISTS,
  SET_CURRENT_LIST,
  DEL_LIST,
  ADD_TO_CURR_MUTABLE_LISTS,
} from '../types';

export const getFoods = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://192.168.0.197:5000/api/foods');

      const allFoods = await response.data.data;

      dispatch({
        type: SET_FOODS,
        foods: allFoods,
      });
    } catch (err) {
      throw new Error('Something went wrong');
    }
  };
};

export const addFav = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://192.168.0.197:5000/api/favFoods/${id}`
      );

      const favFoods = response.data.data.favFoodsArray;

      dispatch({
        type: ADD_FAV,
        foods: favFoods,
      });
    } catch (err) {
      throw new Error('Something went wrong');
    }
  };
};

export const getFavs = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://192.168.0.197:5000/api/favFoods/`
      );

      let resData = response.data.data;
      let favFoods;

      if (!resData) {
        favFoods = [];
        return;
      }

      favFoods = resData.favFoodsArray;

      dispatch({
        type: GET_FAVS,
        foods: favFoods,
      });
    } catch (err) {
      throw new Error('Something went wrong');
    }
  };
};

export const deleteFav = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://192.168.0.197:5000/api/favFoods/${id}`
      );

      const favFoods = response.data.data.favFoodsArray;

      dispatch({
        type: DEL_FAV,
        foods: favFoods,
      });
    } catch (err) {
      throw new Error('Something went wrong');
    }
  };
};

export const saveNewList = (foods, name) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({ foods, name });

      const response = await axios.post(
        'http://192.168.0.197:5000/api/groceryList',
        body,
        config
      );

      const groceryLists = response.data.data.groceryListArray;

      dispatch({
        type: SAVE_LIST,
        foods: groceryLists,
      });
    } catch (err) {
      throw new Error('Something went wrong');
    }
  };
};

export const updateExistingList = (foods, name, id) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({ foods, name });

      const response = await axios.put(
        `http://192.168.0.197:5000/api/groceryList/${id}`,
        body,
        config
      );

      const groceryLists = response.data.data.groceryListArray;

      dispatch({
        type: SAVE_LIST,
        foods: groceryLists,
      });
    } catch (err) {
      throw new Error('Something went wrong');
    }
  };
};

export const getSavedLists = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        'http://192.168.0.197:5000/api/groceryList'
      );

      const data = await response.data.data;

      const groceryLists = data;
      const mutableGroceryLists = JSON.parse(JSON.stringify(data));

      dispatch({
        type: GET_LISTS,
        foods: groceryLists,
      });
      dispatch({
        type: GET_MUTABLE_LISTS,
        foods: mutableGroceryLists,
      });
    } catch (err) {
      throw new Error('Something went wrong');
    }
  };
};

export const restoreMutableList = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        'http://192.168.0.197:5000/api/groceryList'
      );

      const groceryLists = await response.data.data;

      dispatch({
        type: RESTORE_MUTABLE_LISTS,
        foods: groceryLists,
      });
    } catch (err) {
      throw new Error('Something went wrong');
    }
  };
};

export const saveCurrentList = (list) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_CURRENT_LIST,
      foods: list,
    });
  };
};

export const setCurrentList = (id) => {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_LIST,
      id: id,
    });
  };
};

export const addFoodToCurrMutableList = (lists, currentList, foodId) => {
  return (dispatch) => {
    currentList.groceryListArray = [...currentList.groceryListArray, foodId];
    for (let i = 0; i < lists.length; i++) {
      if (lists[i]._id === currentList._id) {
        lists[i].groceryListArray === currentList.groceryListArray;
      }
    }

    dispatch({
      type: ADD_TO_CURR_MUTABLE_LISTS,
      foods: lists,
    });
  };
};

export const deleteListById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://192.168.0.197:5000/api/groceryList/${id}`
      );

      const groceryLists = response.data.data;

      dispatch({
        type: DEL_LIST,
        foods: groceryLists,
      });
    } catch (err) {
      throw new Error('Something went wrong');
    }
  };
};
