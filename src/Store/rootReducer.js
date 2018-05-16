import { combineReducers } from 'redux';

import detail from '../Detail/DetailReducer';
import login from '../Login/LoginReducer';
import search from '../Search/SearchReducer';

export default combineReducers({
  detail,
  login,
  search,
});