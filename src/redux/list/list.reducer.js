import { ADD_ELEMENT, FETCH_LIST, EDIT_ELEMENT } from "./list.types";

import addElementToArray from '../../outils/addElementToArray';

const initialState = {
  listItems: []
}

const listReducer =  (state = initialState, action) => {
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
    case EDIT_ELEMENT:
      return {
        ...state,
        listItems: addElementToArray(state.listItems, action.payload)
      }  
    default:
      return state
  }
}

export default listReducer;