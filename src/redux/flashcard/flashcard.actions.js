// import firebase from 'firebase';
// import { ADD_FLASHCARD } from './flashcard.types';
import { db } from "../../firebase";
// import firebase from "firebase";
import { FEEDBACK_MESSAGE, ERROR_MESSAGE } from '../system/system.types';
import { FETCH_FLASHCARDS } from './flashcard.types';

export const addFlashCard = (el, description) => async (dispatch) => {
  try {
    await db.collection("flashcards").add({
      ...el,
      description
    })

    dispatch({
      type: FEEDBACK_MESSAGE,
      payload: `the flashcard with title ${el.question} has been added`,
    });
  } catch (err) {
    console.log(err);
  }
}

export const fetchFlashcard = () => async (dispatch) => {
  try {
    const flashcards = await db.collection("flashcards").get();
    const arrFlashcards = await flashcards.docs.map(card => {
      return { cardId: card.id, ...card.data() };
    })
    dispatch({ type: FETCH_FLASHCARDS, payload: arrFlashcards });
  } catch (err) {
    dispatch({ type: ERROR_MESSAGE, payload: { ...err } });
  }
}

export const removeFlashCard = (card) => async (dispatch) => {
  try {
    await db.collection("flashcards").doc(card.cardId).delete();

    await dispatch({ type: FEEDBACK_MESSAGE, payload: `The question flashcard "${card.question}" has been removed` });
  } catch (err) {
    dispatch({ type: ERROR_MESSAGE, payload: { ...err } });
  }
}
