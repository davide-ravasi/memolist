import { ADD_ELEMENT, FETCH_LIST, EDIT_ELEMENT, REMOVE_ELEMENT, CLEAN_FEEDBACK_MSG } from "./list.types";

import addElementToArray from '../../outils/addElementToArray';
import removeElementFromArray from '../../outils/removeElementFromArray';

const initialState = {
  listItems: [],
  feedbackMsg: ''
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
        listItems: action.payload,
        feedbackMsg: `The element with title [${action.payload.name}] has been added`
      }
    case EDIT_ELEMENT:
      return {
        ...state,
        listItems: addElementToArray(state.listItems, action.payload),
        feedbackMsg: `The element with title [${action.payload.name}] has been edited`
      } 
    case REMOVE_ELEMENT: 
      return {
        ...state,
        listItems: removeElementFromArray(state.listItems, action.payload),
        feedbackMsg: `The element with title [${action.payload.name}] has been removed`
      }  
    case CLEAN_FEEDBACK_MSG:
      return {
        ...state,
        feedbackMsg: ''
      }  
    default:
      return state
  }
}

export default listReducer;