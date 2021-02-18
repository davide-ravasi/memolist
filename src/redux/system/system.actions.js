import { ERROR_MESSAGE, CLEAN_ERROR_MESSAGE } from './system.types';

export const errorMessage = (err) => (
    { type: ERROR_MESSAGE, payload: err }
) 

export const cleanErrorMsg = () => (
    {type: CLEAN_ERROR_MESSAGE}
)