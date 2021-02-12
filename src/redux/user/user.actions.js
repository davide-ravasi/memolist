import { SET_CURRENT_USER } from "./user.types";
import { ERROR_MESSAGE } from '../system/system.types';
import { checkIsAdmin } from '../../firebase/index';

export const setCurrentUser = user => async dispatch => {
  try {
    const isAdmin = await checkIsAdmin(user);

    user ? 
      user = {
        uid: user.uid,
        name: user.name,
        email: user.email,
        photo: user.photoURL,
        admLvl: isAdmin  
      } : 
      user = null

    dispatch({type: SET_CURRENT_USER, payload: user})
  } catch(err) {
    dispatch({ type: ERROR_MESSAGE, payload: {...err} });
  }
}