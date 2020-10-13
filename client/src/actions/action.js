import {
  CREATE_COUNT,
  DELETE_COUNT,
  EDIT_COUNT,
  SIGNED_IN,
  SIGNED_OUT,
  FETCH_COUNTS,
  FETCH_COUNT,
} from './actionTypes.js';
import history from '../history';

import axios from 'axios';

let instance = axios.create({
  baseURL: 'http://localhost:3001',
});

export const create_count = (arr) => {
  return async (dispatch, getState) => {
    let userId = getState().reducers.userInfo.userId;
    let response = await instance.post('/data/', { ...arr, userId });
    dispatch({
      type: CREATE_COUNT,
      payload: response.data,
    });
    history.push('/countable');
  };
};

export const fetch_count = (userId) => {
  return async (dispatch) => {
    let response = await instance.get('/data/');
    let data = response.data.filter((arr) => arr.userId == userId);
    dispatch({
      type: FETCH_COUNT,
      payload: data,
    });
  };
};

export const fetch_counts = () => {
  return async (dispatch) => {
    let response = await instance.get('/data');
    dispatch({
      type: FETCH_COUNTS,
      payload: response.data,
    });
  };
};

export const delete_count = (store) => {
  return {
    type: DELETE_COUNT,
    payload: store,
  };
};
export const edit_count = (store) => {
  return {
    type: EDIT_COUNT,
    payload: store,
  };
};
export const signed_In = (userId, userName) => {
  return {
    type: SIGNED_IN,
    payload: {
      userId,
      userName,
    },
  };
};

export const signed_Out = () => {
  return {
    type: SIGNED_OUT,
  };
};
