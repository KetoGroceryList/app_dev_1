import axios from 'axios';
import {
  SET_FOODS,
  ADD_FAV,
  GET_FAVS,
  DEL_FAV,
  SAVE_LIST,
  GET_LISTS,
  GET_MUTABLE_LISTS,
  DEL_LIST,
} from '../types';

export const getFoods = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://192.168.0.197:5000/api/foods');

      if (!response) {
        throw new Error('Something went wrong');
      }

      const allFoods = await response.data.data;

      dispatch({
        type: SET_FOODS,
        foods: allFoods,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addFav = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://192.168.0.197:5000/api/favFoods/${id}`
      );

      if (!response) {
        throw new Error('Something went wrong');
      }

      const favFoods = response.data.data.favFoodsArray;

      dispatch({
        type: ADD_FAV,
        foods: favFoods,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const getFavs = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://192.168.0.197:5000/api/favFoods/`
      );

      if (!response) {
        throw new Error('Something went wrong');
      }

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
      throw err;
    }
  };
};

export const deleteFav = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://192.168.0.197:5000/api/favFoods/${id}`
      );

      if (!response) {
        throw new Error('Something went wrong');
      }

      const favFoods = response.data.data.favFoodsArray;

      dispatch({
        type: DEL_FAV,
        foods: favFoods,
      });
    } catch (err) {
      throw err;
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
      if (!response) {
        throw new Error('Something went wrong');
      }
      const groceryLists = response.data.data.groceryListArray;

      dispatch({
        type: SAVE_LIST,
        foods: groceryLists,
      });
    } catch (err) {
      throw err;
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
      if (!response) {
        throw new Error('Something went wrong');
      }
      const groceryLists = response.data.data.groceryListArray;

      dispatch({
        type: SAVE_LIST,
        foods: groceryLists,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const getSavedLists = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        'http://192.168.0.197:5000/api/groceryList'
      );

      if (!response) {
        throw new Error('Something went wrong');
      }

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
      throw err;
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

export const deleteListById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://192.168.0.197:5000/api/groceryList/${id}`
      );

      if (!response) {
        throw new Error('Something went wrong');
      }

      const groceryLists = response.data.data;

      dispatch({
        type: DEL_LIST,
        foods: groceryLists,
      });
    } catch (err) {
      throw err;
    }
  };
};
