import React, { useEffect } from 'react';
import { db } from '../firebase/config';
import ElementDetails from './ElementDetails'; 

const ElementList = () => {
    useEffect(() => {
        db.collection('items').get().then((querySnapshot) => {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
            });
        });
    }, []);
    
    return (
        <div className="max-w-screen-lg mx-auto">
            <div className="grid grid-cols-4 gap-4 py-8">
                <ElementDetails />
                <ElementDetails />
                <ElementDetails />
                <ElementDetails />
                <ElementDetails />
                <ElementDetails />
                <ElementDetails />
                <ElementDetails />
                <ElementDetails />
                <ElementDetails />
            </div>
        </div>
    )
}

export default ElementList;