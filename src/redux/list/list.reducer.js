import {
  ADD_ELEMENT,
  FETCH_LIST,
  EDIT_ELEMENT,
  REMOVE_ELEMENT,
  UPDATE_SEARCH_TERM,
} from "./list.types";

import addElementToArray from "../../outils/addElementToArray";
import removeElementFromArray from "../../outils/removeElementFromArray";

const initialState = {
  listItems: [],
  searchTerm: "",
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIST:
      return {
        ...state,
        listItems: action.payload,
      };
    case ADD_ELEMENT:
      return {
        ...state,
        listItems: action.payload,
      };
    case EDIT_ELEMENT:
      return {
        ...state,
        listItems: addElementToArray(state.listItems, action.payload),
      };
    case REMOVE_ELEMENT:
      return {
        ...state,
        listItems: removeElementFromArray(state.listItems, action.payload),
      };
    case UPDATE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
};

export default listReducer;
