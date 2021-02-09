import { SET_CURRENT_USER } from "./user.types";

const initState = {
    currentUser: null
}

export default (state = initState, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            console.log('set current user');
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;    
    }
}