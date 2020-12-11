import { FETCH_LIST } from "./types";
import { db } from "../firebase";

export const fetchList = () => async function(dispatch) {
  const list = await db.collection('notes').get();
  // add doc id to every element in collection
  const arrayList = list.docs.map(doc => { return {...doc.data(), id: doc.id}});

  dispatch({ type: FETCH_LIST, payload: arrayList });
}