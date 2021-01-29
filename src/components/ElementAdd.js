import React from 'react';
import { useSelector } from 'react-redux';
import ElementForm from './ElementForm';
import { addElement } from '../actions/';

const ElementAdd = () => {
    const {currentUser} = useSelector(state => state.user);
    return <div className="max-w-screen-lg mx-auto pt-5"> 
        <ElementForm action={ addElement } userName={currentUser.name} />
    </div>
}

export default ElementAdd;