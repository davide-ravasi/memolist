import React from 'react';
import './styles.css';
/// https://daveceddia.com/tailwind-create-react-app
import './tailwind.output.css';
import Header from './components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const App = () => {
    return (
        <div>
            <Header />
        </div>
    )
}

export default App;