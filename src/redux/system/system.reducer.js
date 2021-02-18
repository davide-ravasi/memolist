import { ERROR_MESSAGE, CLEAN_ERROR_MESSAGE } from './system.types';

const initialState = {
    error: null
}


const systemReducer = (state = initialState, action) => {
    switch(action.type) {
        case ERROR_MESSAGE:
            return {
                error: action.payload
        }
        case CLEAN_ERROR_MESSAGE:
            return {
                error: null
            }
        default:
            return state;    
    }
}

export default systemReducer;