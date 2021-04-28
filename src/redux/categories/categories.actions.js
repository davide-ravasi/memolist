import { FETCH_CATEGORIES, SET_ACTIVE_CATEGORY } from "./categories.types";
import { ERROR_MESSAGE, FEEDBACK_MESSAGE } from "../system/system.types";
import { db } from "../../firebase";

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

export const modifyCategory = (idCat, newName) => async (dispatch) => {
  try {
    await db.collection("categories").doc(idCat).update({
      name: newName,
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
    await db.collection("categories").add({
      name: name,
      count: 0,
      created_at: new Date(),
    });

    dispatch({
      type: FEEDBACK_MESSAGE,
      payload: `the new category ${name} has been added :) `,
    });
  } catch (err) {
    dispatch({ type: ERROR_MESSAGE, payload: err });
  }
};
