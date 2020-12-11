import axios from 'axios';
import { SET_FOODS, ADD_FAV } from '../types';

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
        `http://192.168.0.197:5000/api/foods/${id}`
      );

      if (!response) {
        throw new Error('Something went wrong');
      }

      console.log(response.data);

      dispatch({
        type: ADD_FAV,
        food: response.data,
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
