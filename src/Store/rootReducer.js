import { combineReducers } from 'redux';

import detail from '../Nbp/Detail/DetailReducer';
import login from '../Login/LoginReducer';
import search from '../Nbp/Search/SearchReducer';

export default combineReducers({
  detail,
  login,
  search,
});