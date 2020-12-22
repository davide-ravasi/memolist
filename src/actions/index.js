import { FETCH_LIST, ADD_ELEMENT } from "./types";
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
  console.log("edited element");
  console.log(addEl);
   //dispatch({ type: ADD_ELEMENT, payload: el});
}