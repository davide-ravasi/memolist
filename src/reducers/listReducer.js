import { ADD_ELEMENT, FETCH_LIST } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_LIST:
      return [...action.payload]
    case ADD_ELEMENT:
      return [...state, action.payload]
    default:
      return state
  }
}