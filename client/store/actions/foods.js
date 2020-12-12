import axios from 'axios';
import { SET_FOODS, ADD_FAV, GET_FAVS, DEL_FAV } from '../types';

export const getFoods = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://192.168.0.197:5000/api/foods');

      if (!response) {
        throw new Error('Something went wrong');
      }

      const resData = await response.data;
      const loadedFoods = resData;

      dispatch({
        type: SET_FOODS,
        foods: loadedFoods,
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

      const favFoods = response.data.data.favFoodsArray;

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

// for (const key in resData) {
//   loadedFoods.push(
//     new Food(
//       key,
//       resData[key].name,
//       resData[key].foodType,
//       resData[key].imageUrl,
//       resData[key].protein,
//       resData[key].fats,
//       resData[key].fiber,
//       resData[key].netCarbs,
//       resData[key].macrosSplit
//     )
//   );
// }
