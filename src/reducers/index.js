import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer';
import listReducer from './listReducer';
import userReducer from './userReducer';

export default combineReducers({
  list: listReducer,
  user: userReducer,
  categories: categoriesReducer
});