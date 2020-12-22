import React from 'react';
import ElementForm from './ElementForm';
import { addElement } from '../actions/';

const ElementAdd = () => {
    return <div className="max-w-screen-lg mx-auto pt-5"> 
        <ElementForm action={ addElement } />
    </div>
}

export default ElementAdd;