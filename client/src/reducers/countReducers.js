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
        // ...action.payload,
        [action.payload.userId]: action.payload,
      };
    case DELETE_COUNT:
      return {};
    case EDIT_COUNT:
      return {};
    case FETCH_COUNT:
      return {
        ...state,
        [action.payload.userId]: action.payload,
      };
    case FETCH_COUNTS:
      return {
        ...state,
        ..._.mapKeys(action.payload, 'id'),
      };

    default:
      return state;
  }
};
