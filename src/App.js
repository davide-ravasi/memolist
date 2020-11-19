import React, { useEffect } from 'react';
import './styles.css';
/// https://daveceddia.com/tailwind-create-react-app
import './tailwind.output.css';
import Header from './components/header';
import { db } from './firebase/config';


const App = () => {
    useEffect(() => {
        db.collection('items').get().then((querySnapshot) => {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
            });
        });
    }, []);

    return (
        <div>
            <Header />
        </div>
    )
}

export default App;