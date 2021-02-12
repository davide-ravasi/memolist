import { FETCH_LIST, ADD_ELEMENT, EDIT_ELEMENT, REMOVE_ELEMENT, CLEAN_FEEDBACK_MSG } from "./list.types";
import { ERROR_MESSAGE } from '../system/system.types';
import { db } from "../../firebase";

export const fetchList = () => async function(dispatch) {
  try {
    const list = await db.collection('notes').get();
    // add doc id to every element in collection
    const arrayList = list.docs.map(doc => { return {...doc.data(), id: doc.id}});
    dispatch({ type: FETCH_LIST, payload: arrayList });
  } catch(err) {
    dispatch({ type: ERROR_MESSAGE, payload: {...err} });
  }
  
}

export const addElement = (el, name) => async dispatch => {
  try {
    const addEl = await db.collection('notes').add({...el, userName: name, created_at: new Date()});
    dispatch({ type: ADD_ELEMENT, payload: el});
  } catch(err) {
    dispatch({ type: ERROR_MESSAGE, payload: {...err} });
  }
}

export const editElement = (el) => async dispatch => {
  try {
    const editEl = await db.collection('notes').doc(el.id).set(el);
    dispatch({ type: EDIT_ELEMENT, payload: el});
  } catch(err) {
    dispatch({ type: ERROR_MESSAGE, payload: {...err} });
  }
}

export const removeElement = (el) => async dispatch => {
  try {
    const removeEl = await db.collection('notes').doc(el.id).delete();
    dispatch({ type: REMOVE_ELEMENT, payload: el});
  } catch(err) {
    dispatch({ type: ERROR_MESSAGE, payload: {...err} });
  }
}

export const cleanFeedbackMsg = () => (
  {type: CLEAN_FEEDBACK_MSG}
)
