import {
  FETCH_CATEGORIES,
  SET_ACTIVE_CATEGORY,
} from "./categories.types";

const initial_state = {
  listCategories: [],
  activeCategory: "",
};

const categoriesReducer = (state = initial_state, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return { ...state, listCategories: action.payload };
    case SET_ACTIVE_CATEGORY:
      return { ...state, activeCategory: action.payload };
    default:
      return state;
  }
};

export default categoriesReducer;
