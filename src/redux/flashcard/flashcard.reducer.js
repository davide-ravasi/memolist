import {
  FETCH_FLASHCARDS,
} from "./flashcard.types";

const initial_state = {
  listFlashcards: [],
};

const flashcardReducer = (state = initial_state, action) => {
  switch (action.type) {
    case FETCH_FLASHCARDS:
      return { ...state, listFlashcards: action.payload };
    default:
      return state;
  }
};

export default flashcardReducer;