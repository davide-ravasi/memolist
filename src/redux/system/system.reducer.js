import {
  ERROR_MESSAGE,
  CLEAN_ERROR_MESSAGE,
  FEEDBACK_MESSAGE,
  CLEAN_FEEDBACK_MSG,
} from "./system.types";

const initialState = {
  error: null,
  feedbackMessage: "",
};

const systemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_MESSAGE:
      return {
        error: action.payload,
        feedbackMessage: "",
      };
    case CLEAN_ERROR_MESSAGE:
      return {
        error: null,
      };
    case FEEDBACK_MESSAGE:
      return {
        error: null,
        feedBackMessage: action.payload,
      };
    case CLEAN_FEEDBACK_MSG:
      return {
        ...state,
        feedBackMessage: "",
      };
    default:
      return state;
  }
};

export default systemReducer;
