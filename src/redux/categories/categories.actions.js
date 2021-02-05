import { FETCH_CATEGORIES, SET_ACTIVE_CATEGORY } from "./categories.types";
import { db } from "../../firebase";


export const fetchCategories = () => async dispatch => {
    const listCategories = await db.collection('categories').get();
    const arrCat = await listCategories.docs.map(cat => cat.data());
  
    dispatch({type: FETCH_CATEGORIES, payload: arrCat});
  }
  
  export const setActiveCategory = (cat) => {
    return {type: SET_ACTIVE_CATEGORY, payload: cat}
  }