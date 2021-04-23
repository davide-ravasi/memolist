import { FETCH_CATEGORIES, SET_ACTIVE_CATEGORY } from "./categories.types";
import { ERROR_MESSAGE, MODIFY_CATEGORY } from "../system/system.types";
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
    console.log(arrCat);
    dispatch({ type: FETCH_CATEGORIES, payload: arrCat });
  } catch (err) {
    dispatch({ type: ERROR_MESSAGE, payload: { ...err } });
  }
};

export const setActiveCategory = (cat) => {
  return { type: SET_ACTIVE_CATEGORY, payload: cat };
};

export const modifyCategory = (idCat, newName) => async (dispatch) => {
  console.log(idCat + " xxx  " + newName);
  try {
    const category = await db.collection("categories").doc(idCat).update({
      name: newName,
    });

    // dispatch({ type: MODIFY_CATEGORY, payload: name });
  } catch (err) {
    console.log(err);
    dispatch({ type: ERROR_MESSAGE, payload: err });
  }
};
