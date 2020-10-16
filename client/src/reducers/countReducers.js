import {
  CREATE_COUNT,
  DELETE_COUNT,
  EDIT_COUNT,
  FETCH_COUNT,
  FETCH_COUNTS,
} from '../actions/actionTypes';

import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_COUNT:
      return {
        ...state,

        [action.payload.uuid]: action.payload,
      };
    case DELETE_COUNT:
      delete state[action.payload];
      // return state.filter((instances) => instances.uuid !== action.payload);
      return state;

    case EDIT_COUNT:
      return {
        ...state,
        [action.payload.uuid]: action.payload,
      };
    case FETCH_COUNT:
      return {
        ...state,
        [action.payload.uuid]: action.payload,
      };
    case FETCH_COUNTS:
      return {
        ..._.mapKeys(action.payload, 'uuid'),
      };

    default:
      return state;
  }
};
