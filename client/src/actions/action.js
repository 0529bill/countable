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
import { v4 as uuidv4 } from 'uuid';

import axios from 'axios';

let instance = axios.create({
  baseURL: 'http://localhost:3001/',
});

export const create_count = (arr) => {
  return async (dispatch, getState) => {
    let userId = getState().reducers.userInfo.userId;
    let uuid = uuidv4();
    let response = await instance.post('/data/', { ...arr, userId, uuid });
    dispatch({
      type: CREATE_COUNT,
      payload: response.data,
    });
    history.push('/countable');
  };
};

export const fetch_count = (userId) => {
  return async (dispatch) => {
    let response = await instance.get(`data/${userId}`);

    dispatch({
      type: FETCH_COUNT,
      payload: response.data,
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

export const delete_count = (uuid) => {
  return async (dispatch) => {
    await instance.delete(`/data/${uuid}`);
    dispatch({
      type: DELETE_COUNT,
      payload: uuid,
    });
    // history.push('/countable');
  };
};
export const edit_count = (uuid, arr) => {
  return async (dispatch, getState) => {
    let userId = getState().reducers.userInfo.userId;
    let response = await instance.put(`data/${uuid}`, {
      ...arr,
      userId,
      uuid,
    });
    dispatch({
      type: EDIT_COUNT,
      payload: response.data,
    });
    history.push('/countable');
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

export const reloading = (value) => {
  return {
    type: 'RELOADING',
    payload: value,
  };
};
