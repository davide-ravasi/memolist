import firebase from 'firebase';
import { ADD_FLASHCARD } from './flashcard.types';
import { db } from '../../firebase/index';

export const addFlashCard = (el, description) => async (dispatch) => {
  console.log(el);
  console.log(description);

  try {
    const docRef = await db.collection("flashcards").add({
      ...el,
      description
    })



  } catch (err) {
    console.log(err);
  }
}
