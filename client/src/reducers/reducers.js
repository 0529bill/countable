import { SIGNED_IN, SIGNED_OUT } from '../actions/actionTypes';

const initialState = {
  isSignedIn: null,
  userInfo: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNED_IN:
      return { ...state, isSignedIn: true, userInfo: action.payload }; //important parts!
    case SIGNED_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      // return { ...state, isSignedIn: true, userInfo: action.payload };
      return initialState;
  }
};
