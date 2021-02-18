import { ADD_TO_WISHLIST, FETCH_WISHLIST, REMOVE_WISHLIST, REMOVE_FROM_WISHLIST } from "./wishlist.types";

const wishlistReducer = (state = [], action) => {
    switch(action.type) {
        case FETCH_WISHLIST:
            return [...action.payload]
        case REMOVE_WISHLIST:
            return []  
        case ADD_TO_WISHLIST:
            return [...action.payload]
        case REMOVE_FROM_WISHLIST:
            return [...action.payload]  
        default:
            return state    
    }
}

export default wishlistReducer;