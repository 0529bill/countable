import { SIGNED_IN, SIGNED_OUT } from '../actions/actionTypes';

const initialState = {
  isSignedIn: null,
  userInfo: null,
  reload: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNED_IN:
      return { ...state, isSignedIn: true, userInfo: action.payload }; //important parts!
    case SIGNED_OUT:
      return { ...state, isSignedIn: false, userId: null };
    case 'RELOADING':
      return { reload: !action.payload };
    default:
      console.log('something went wrong', action);

      return state;
    // need to return state instead of initialState
  }
};
