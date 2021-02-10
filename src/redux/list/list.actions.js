import { FETCH_LIST, ADD_ELEMENT, EDIT_ELEMENT, REMOVE_ELEMENT, CLEAN_FEEDBACK_MSG } from "./list.types";
import { db } from "../../firebase";

export const fetchList = () => async function(dispatch) {
  const list = await db.collection('notes').get();
  // add doc id to every element in collection
  const arrayList = list.docs.map(doc => { return {...doc.data(), id: doc.id}});
  dispatch({ type: FETCH_LIST, payload: arrayList });
}

export const addElement = (el, name) => async dispatch => {
  const addEl = await db.collection('notes').add({...el, userName: name, created_at: new Date()});
  dispatch({ type: ADD_ELEMENT, payload: el});
}

export const editElement = (el) => async dispatch => {
  const editEl = await db.collection('notes').doc(el.id).set(el);
  dispatch({ type: EDIT_ELEMENT, payload: el});
}

export const removeElement = (el) => async dispatch => {
  const removeEl = await db.collection('notes').doc(el.id).delete();
  dispatch({ type: REMOVE_ELEMENT, payload: el});
}

export const cleanFeedbackMsg = () => (
  {type: CLEAN_FEEDBACK_MSG}
)
