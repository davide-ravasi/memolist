import React, { useEffect } from 'react';
import { db } from '../firebase/config';

const ElementList = () => {
    useEffect(() => {
        db.collection('items').get().then((querySnapshot) => {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
            });
        });
    }, []);
    
    return <div>List</div>
}

export default ElementList;