import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "./wishlist.types";
import { ERROR_MESSAGE } from '../system/system.types';
import { db } from "../../firebase";

export const addToWishlist = (userId, elementId) => async dispatch => {
    try {
        const wishlistRef = await db.collection('wishlist').doc(userId);
        const wishlistDoc = await wishlistRef.get();
        let list = [];

        if(wishlistDoc.exists) {
            list = wishlistDoc.data().list;
            list.push(elementId);
            wishlistRef.set({
                'list': list
            })
            dispatch({ type: ADD_TO_WISHLIST, payload: list });
        } else {
            wishlistRef.set({
                'list': [elementId]
            })  
            dispatch({ type: ADD_TO_WISHLIST, payload: [elementId] });
        }
    } catch(err) {
        dispatch({ type: ERROR_MESSAGE, payload: {...err} });
    }
}

export const removeFromWishlist = (userId, elementId) => async dispatch => {
    try {
        const wishlistRef = await db.collection('wishlist').doc(userId);
        const wishlistDoc = await wishlistRef.get();

        if(wishlistDoc.exists) {
            const list = wishlistDoc.data().list;
            const filteredList = list.filter(el => el !== elementId)

            wishlistRef.set({
                'list': filteredList
            })

            dispatch({ type: REMOVE_FROM_WISHLIST, payload: filteredList });
        } 
        
    } catch(err) {
        dispatch({ type: ERROR_MESSAGE, payload: {...err} });
    }   
}