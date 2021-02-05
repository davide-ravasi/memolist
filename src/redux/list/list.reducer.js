import { ADD_ELEMENT, FETCH_LIST } from "./list.types";

const initialState = {
  listItems: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIST:
      return {
        ...state,
        listItems: action.payload
      }
    case ADD_ELEMENT:
      return {
        ...state,
        listItems: action.payload
      }
    default:
      return state
  }
}