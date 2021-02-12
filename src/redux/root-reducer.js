import { combineReducers } from 'redux';
import categoriesReducer from './categories/categories.reducer';
import listReducer from './list/list.reducer';
import userReducer from './user/user.reducer';
import systemReducer from './system/system.reducer';

export default combineReducers({
  list: listReducer,
  user: userReducer,
  categories: categoriesReducer,
  system: systemReducer
});