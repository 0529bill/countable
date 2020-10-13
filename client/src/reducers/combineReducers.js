import { combineReducers } from 'redux';
import reducers from './reducers';
import countReducers from './countReducers';

export default combineReducers({
  reducers,
  countReducers,
});
