import { SET_CURRENT_USER } from "./user.types";
import { checkIsAdmin } from '../../firebase/index';

export const setCurrentUser = user => async dispatch => {
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
}