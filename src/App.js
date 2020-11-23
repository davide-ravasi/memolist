import React from 'react';
import { Route, Switch } from 'react-router-dom';

/// https://daveceddia.com/tailwind-create-react-app
import './tailwind.output.css';
import './styles.css';

import Header from './components/header';
import ElementDetails from './components/ElementDetails';
import ElementList from './components/ElementList';


const App = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route path="/" exact component={ElementList} />
                <Route path="/element/:id" exact component={ElementDetails} />
            </Switch>
        </div>
    )
}

export default App;