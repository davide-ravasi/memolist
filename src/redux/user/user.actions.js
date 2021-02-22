import { SET_CURRENT_USER } from "./user.types";
import { FETCH_WISHLIST } from '../wishlist/wishlist.types';
import { ERROR_MESSAGE } from '../system/system.types';

import { checkIsAdmin } from '../../firebase/index';
import { db } from "../../firebase";

export const setCurrentUser = user => async dispatch => {
  try {
    const isAdmin = await checkIsAdmin(user);
    let wishlist = [];
    if(user) {
      const wishlistRef = await db.collection('wishlist').doc(user.uid);
      const wishlistDoc = await wishlistRef.get();
      const {list} = wishlistDoc.data();
      wishlist = list;

      user = {
        uid: user.uid,
        name: user.name,
        email: user.email,
        photo: user.photoURL,
        admLvl: isAdmin  
      }
    } else {
      user = null
    }

    dispatch({type: SET_CURRENT_USER, payload: user})
    dispatch({type: FETCH_WISHLIST, payload: wishlist})
  } catch(err) {
    dispatch({ type: ERROR_MESSAGE, payload: err });
  }
}