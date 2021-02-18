import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { editElement } from '../redux/list/list.actions';

import ElementForm from './ElementForm';

const ElementEdit = () => {
    const {listItems} = useSelector(state => state.list);
    let { id } = useParams();
    const note = listItems.find(el => el.id === id);
    const defaultValues = {...note} 

    return <div className="max-w-screen-lg mx-auto pt-5 px-4"> 
        <ElementForm defaultValues={defaultValues} action={editElement} />
    </div>
}

export default ElementEdit;