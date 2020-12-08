import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTHENTICATE, SET_DID_TRY_AL, LOGOUT } from '../types';

let timer;
const oneMonth = 30 * 24 * 60 * 60 * 1000;

export const authenticate = (token, userId, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, token, userId });
  };
};

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const register = (name, email, password) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ name, email, password });

    const response = await axios.post(
      'http://localhost:5000/api/auth/register',
      body,
      config
    );

    if (!response) {
      throw new Error('Something went wrong');
    }

    const resData = response.data;
    dispatch(authenticate(resData.token, resData.user._id, oneMonth));
    const expirationDate = resData.options.expires;
    saveDataToStorage(resData.token, resData.user._id, expirationDate);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ email, password });
    const response = await axios.post(
      'http://localhost:5000/api/auth/login',
      body,
      config
    );

    if (!response) {
      throw new Error('Something went wrong');
    }
    const resData = response.data;
    dispatch(authenticate(resData.token, resData.user._id, oneMonth));
    const expirationDate = resData.options.expires;
    saveDataToStorage(resData.token, resData.user._id, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

/** UTILS */
const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate,
    })
  );
};
