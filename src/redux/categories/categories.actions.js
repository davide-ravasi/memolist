import { FETCH_CATEGORIES, SET_ACTIVE_CATEGORY } from "./categories.types";
import { ERROR_MESSAGE } from '../system/system.types';
import { db } from "../../firebase";


export const fetchCategories = () => async dispatch => {
  try {
    const listCategories = await db.collection('categories').get();
    const arrCat = await listCategories.docs.map(cat => cat.data());
    dispatch({type: FETCH_CATEGORIES, payload: arrCat});
  } catch(err) {
    dispatch({ type: ERROR_MESSAGE, payload: {...err} });
  }
}
  
export const setActiveCategory = (cat) => {
  return {type: SET_ACTIVE_CATEGORY, payload: cat}
}