import { FETCH_LIST, ADD_ELEMENT, FETCH_CATEGORIES, SET_ACTIVE_CATEGORY, SET_CURRENT_USER } from "./types";
import { db } from "../firebase";

export const fetchList = () => async function(dispatch) {
  const list = await db.collection('notes').get();
  // add doc id to every element in collection
  const arrayList = list.docs.map(doc => { return {...doc.data(), id: doc.id}});

  dispatch({ type: FETCH_LIST, payload: arrayList });
}

export const addElement = (el, name) => async dispatch => {
  const addEl = await db.collection('notes').add({...el, userName: name, created_at: new Date()});
  console.log("added element");
  console.log(addEl);
   //dispatch({ type: ADD_ELEMENT, payload: el});
}

export const editElement = (el) => async dispatch => {
  const addEl = await db.collection('notes').doc(el.id).set(el);
   //dispatch({ type: ADD_ELEMENT, payload: el});
}

export const removeElement = (id) => async dispatch => {
  const removeEl = await db.collection('notes').doc(id).delete();

  console.log('element removed', removeEl);
}

export const setCurrentUser = (user) => {
  user ? 
    user = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL
    } : 
    user = null

  return {type: SET_CURRENT_USER, payload: user}
}


export const fetchCategories = () => async dispatch => {
  const listCategories = await db.collection('categories').get();
  const arrCat = await listCategories.docs.map(cat => cat.data());

  dispatch({type: FETCH_CATEGORIES, payload: arrCat});
}

export const setActiveCategory = (cat) => {
  return {type: SET_ACTIVE_CATEGORY, payload: cat}
}