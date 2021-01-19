import { FETCH_CATEGORIES } from "../actions/types";

const initial_state = {
    listCategories: []
}

export default (state = initial_state, action) => {
    console.log('action in lisr reducer', action);
    switch(action.type) {
        case FETCH_CATEGORIES:
            return {...state, listCategories: action.payload}
        default:
            return state
    }
}