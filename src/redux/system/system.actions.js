import { ERROR_MESSAGE, CLEAN_ERROR_MESSAGE } from './system.types';
import convertErrorMessages from '../../outils/convertErrorMessages';

export const errorMessage = (err) => (
    { type: ERROR_MESSAGE, payload: convertErrorMessages(err) }
) 

export const cleanErrorMsg = () => (
    {type: CLEAN_ERROR_MESSAGE}
)