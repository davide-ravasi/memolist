import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { db } from "../firebase";

import { editElement } from '../redux/list/list.actions';

import ElementForm from './ElementForm';

const ElementEdit = () => {
    const {listItems} = useSelector(state => state.list);
    let { id } = useParams();
    const note = listItems.find(el => el.id === id);
    const defaultValues = {...note} 

    // useEffect(() => {
    //     const unsubscribe = db.collection("notes")
    //     .onSnapshot((snapshot) => {
    //         snapshot.docChanges().forEach((change) => {
    //             if (change.type === "modified") {
    //                 console.log("modified element: ", change.doc.data());
    //             }
    //         });
    //     });

    //     return () => unsubscribe();
    //   }, []);

    return <div className="max-w-screen-lg mx-auto pt-5"> 
        <ElementForm defaultValues={defaultValues} action={editElement} />
    </div>
}

export default ElementEdit;