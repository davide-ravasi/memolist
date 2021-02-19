import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { addElement } from '../redux/list/list.actions';

import ElementForm from './ElementForm';

const ElementAdd = () => {
    const {currentUser} = useSelector(state => state.user);

    // useEffect(() => {
    //     const unsubscribe = db.collection("notes")
    //     .onSnapshot((snapshot) => {
    //         snapshot.docChanges().forEach((change) => {
    //             if (change.type === "added") {
    //                 console.log("added element: ", change.doc.data());
    //             }
    //         });
    //     });

    //     return () => unsubscribe();
    // }, []);

    return <div className="max-w-screen-lg mx-auto pt-5 px-4"> 
        <ElementForm action={ addElement } userName={currentUser ? currentUser.name : ''} />
    </div>
}

export default ElementAdd;