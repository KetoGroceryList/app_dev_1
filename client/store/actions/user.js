import axios from 'axios';
import { GET_USER, UPDATE_PROFILE } from '../types';

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

export const updateProfile = (name, email) => {
  console.log(name);
  console.log(email);
  return async (dispatch) => {
    try {
      const body = JSON.stringify({ name, email });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.put(
        'http://192.168.0.197:5000/api/auth/updatedetails',
        body,
        config
      );

      if (!response) {
        throw new Error('Update did not occurr due to an error');
      }

      dispatch({
        type: UPDATE_PROFILE,
        user: {
          name,
          email,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};
