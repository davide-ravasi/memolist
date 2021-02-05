import { SET_CURRENT_USER } from "./user.types";

export const setCurrentUser = (user) => {
  user ? 
    user = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL
    } : 
    user = null

  return {type: SET_CURRENT_USER, payload: user}
}