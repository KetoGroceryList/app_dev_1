import axios from 'axios';
import { GET_FOODS, GET_FOODS_ERROR } from '../types';

export const getFoods = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/foods/');
    dispatch({
      type: GET_FOODS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_FOODS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
