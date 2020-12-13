import axios from 'axios';
import { GET_USER } from '../types';

export const getUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://192.168.0.197:5000/api/auth/me');
      if (!response) {
        throw new Error('You are not logged in');
      }

      const user = response.data.data;

      dispatch({
        type: GET_USER,
        user: user,
      });
    } catch (err) {
      throw err;
    }
  };
};
