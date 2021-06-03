import firebase from "firebase";
import {
  FETCH_LIST,
  ADD_ELEMENT,
  EDIT_ELEMENT,
  REMOVE_ELEMENT,
  UPDATE_SEARCH_TERM,
} from "./list.types";
import { ERROR_MESSAGE, FEEDBACK_MESSAGE } from "../system/system.types";
import { db } from "../../firebase";

export const fetchList = () =>
  async function (dispatch) {
    try {
      const list = await db.collection("notes").get();
      // add doc id to every element in collection
      const arrayList = list.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      dispatch({ type: FETCH_LIST, payload: arrayList });
    } catch (err) {
      dispatch({ type: ERROR_MESSAGE, payload: { ...err } });
    }
  };

export const addElement = (el, description, name) => async (dispatch) => {
  try {
    await db.collection("notes").add({
      ...el,
      description: description,
      userName: name,
      created_at: new Date(),
    });

    const catSnapshot = await db
      .collection("categories")
      .where("name", "==", el.category)
      .get();

    let catID = "";

    catSnapshot.forEach((el) => {
      catID = el.id;
    });

    await db
      .collection("categories")
      .doc(catID)
      .update({
        count: firebase.firestore.FieldValue.increment(1),
      });

    dispatch({ type: ADD_ELEMENT, payload: el });
    dispatch({
      type: FEEDBACK_MESSAGE,
      payload: `The element with title [${el.name}] has been added`,
    });
  } catch (err) {
    dispatch({ type: ERROR_MESSAGE, payload: { ...err } });
  }
};

export const editElement = (el, description) => async (dispatch) => {
  try {
    await db
      .collection("notes")
      .doc(el.id)
      .set({ ...el, description: description });
    dispatch({ type: EDIT_ELEMENT, payload: el });
    dispatch({
      type: FEEDBACK_MESSAGE,
      payload: `The element with title [${el.name}] has been edited`,
    });
  } catch (err) {
    dispatch({ type: ERROR_MESSAGE, payload: { ...err } });
  }
};

export const removeElement = (el) => async (dispatch) => {
  try {
    await db.collection("notes").doc(el.id).delete();
    dispatch({ type: REMOVE_ELEMENT, payload: el });

    const catSnapshot = await db
      .collection("categories")
      .where("name", "==", el.category)
      .get();

    let catID = "";

    catSnapshot.forEach((el) => {
      catID = el.id;
    });

    await db
      .collection("categories")
      .doc(catID)
      .update({
        count: firebase.firestore.FieldValue.increment(-1),
      });

    dispatch({
      type: FEEDBACK_MESSAGE,
      payload: `The element with title [${el.name}] has been removed`,
    });
  } catch (err) {
    dispatch({ type: ERROR_MESSAGE, payload: { ...err } });
  }
};

export const updateSearchterm = (searchTerm) => ({
  type: UPDATE_SEARCH_TERM,
  payload: searchTerm,
});
