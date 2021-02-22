import React from 'react';
import { useSelector } from 'react-redux';

import { addElement } from '../redux/list/list.actions';

import ElementForm from './ElementForm';

const ElementAdd = () => {
    const {currentUser} = useSelector(state => state.user);

    return <div className="max-w-screen-lg mx-auto pt-5 px-4"> 
        <ElementForm action={ addElement } userName={currentUser ? currentUser.name : ''} />
    </div>
}

export default ElementAdd;