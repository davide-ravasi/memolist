import { SET_CURRENT_USER } from "../actions/types";

const initState = {
    currentUser: null
}

export default (state = initState, action) => {
    switch(action.payload) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;    
    }
}