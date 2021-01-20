import { FETCH_LIST, ADD_ELEMENT, FETCH_CATEGORIES, SET_ACTIVE_CATEGORY } from "./types";
import { db } from "../firebase";

export const fetchList = () => async function(dispatch) {
  const list = await db.collection('notes').get();
  // add doc id to every element in collection
  const arrayList = list.docs.map(doc => { return {...doc.data(), id: doc.id}});

  dispatch({ type: FETCH_LIST, payload: arrayList });
}

export const addElement = (el) => async dispatch => {
  const addEl = await db.collection('notes').add(el);
  console.log("added element");
  console.log(addEl);
   //dispatch({ type: ADD_ELEMENT, payload: el});
}

export const editElement = (el) => async dispatch => {
  const addEl = await db.collection('notes').doc(el.id).set(el);
   //dispatch({ type: ADD_ELEMENT, payload: el});
}

export const setCurrentUser = (user) => async dispatch => {
  console.log('action : ',user);
}

export const fetchCategories = () => async dispatch => {
  const listCategories = await db.collection('categories').get();
  const arrCat = await listCategories.docs.map(cat => cat.data());

  dispatch({type: FETCH_CATEGORIES, payload: arrCat});
}

export const setActiveCategory = (cat) => {
  return {type: SET_ACTIVE_CATEGORY, payload: cat}
}