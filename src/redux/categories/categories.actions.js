import { FETCH_CATEGORIES, SET_ACTIVE_CATEGORY } from "./categories.types";
import { ERROR_MESSAGE, FEEDBACK_MESSAGE } from "../system/system.types";
import { db } from "../../firebase";
import firebase from "firebase";

export const fetchCategories = () => async (dispatch) => {
  try {
    const listCategories = await db.collection("categories").get();
    const arrCat = await listCategories.docs.map((cat) => {
      const data = cat.data();
      return {
        id: cat.id,
        name: data.name,
        count: data.count,
        created_at: data.created_at,
      };
    });
    dispatch({ type: FETCH_CATEGORIES, payload: arrCat });
  } catch (err) {
    dispatch({ type: ERROR_MESSAGE, payload: { ...err } });
  }
};

export const setActiveCategory = (cat) => {
  return { type: SET_ACTIVE_CATEGORY, payload: cat };
};

export const modifyCategory = (idCat, oldName, newName) => async (dispatch) => {
  try {
    await db.collection("categories").doc(idCat).update({
      name: newName,
    });

    // update items that have category removed
    const catCollection = await db
      .collection("notes")
      .where("category", "==", oldName)
      .get();

    catCollection.forEach((doc) => {
      doc.ref.update({
        category: newName,
      });
    });

    dispatch({
      type: FEEDBACK_MESSAGE,
      payload: `the category name with id ${idCat} is now ${newName}`,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: ERROR_MESSAGE, payload: err });
  }
};

export const addCategory = (name) => async (dispatch) => {
  try {
    let newPayload;
    //check if category exists
    const catExists = await db.collection("categories").where('name', '==', name).get();

    if (catExists.size === 0) {
      await db.collection("categories").add({
        name: name,
        count: 0,
        created_at: new Date(),
      });

      newPayload = `the new category ${name} has been added :) `
    } else {
      newPayload = `the category ${name} already exists :) `
    }

    dispatch({
      type: FEEDBACK_MESSAGE,
      payload: newPayload,
    });
  } catch (err) {
    dispatch({ type: ERROR_MESSAGE, payload: err });
  }
};

export const removeCategory = (idCat, name) => async (dispatch) => {
  try {
    await db.collection("categories").doc(idCat).delete();

    // update items that have category removed
    const catCollection = await db
      .collection("notes")
      .where("category", "==", name)
      .get();

    catCollection.forEach((doc) => {
      doc.ref.update({
        category: "misc",
      });
    });

    // update counter misc cat
    const catSnapshot = await db
      .collection("categories")
      .where("name", "==", "misc")
      .limit(1)
      .get();

    await db
      .collection("categories")
      .doc(catSnapshot.docs[0].id)
      .update({
        count: firebase.firestore.FieldValue.increment(catCollection.size),
      });

    dispatch({
      type: FEEDBACK_MESSAGE,
      payload: `the category ${name} was deleted successfully :) `,
    });
  } catch (err) {
    dispatch({ type: ERROR_MESSAGE, payload: err });
  }
};
