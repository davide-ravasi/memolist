import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchList } from './actions/';

/// https://daveceddia.com/tailwind-create-react-app
import "./tailwind.output.css";
import "./styles.css";

import { auth, signInGoogle } from "./firebase";
import Header from "./components/header";
import ElementDetails from "./components/ElementDetails";
import ElementList from "./components/ElementList";
import ElementAdd from "./components/ElementAdd";
import ElementEdit from "./components/ElementEdit";

const signIn = (e) => {
  e.preventDefault();
  signInGoogle();
};

const signOut = (e) => {
  e.preventDefault();
  auth.signOut();
};

const App = () => {
  const [userState, setUserState] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log(user);
        // User is signed in.
        setUserState(user);
      } else {
        console.log(user);
        // User is signed out
        setUserState(null);
      }
    });
  }, []);

  // useEffect(() => {
  //   dispatch(fetchList());
  // },[]);

  return (
    <div>
      <Header signIn={signIn} signOut={signOut} user={userState} />
      <Switch>
        <Route path="/" exact component={ElementList} />       
        <Route path="/element/add" exact component={ElementAdd} />
        <Route path="/element/edit/:id" exact component={ElementEdit} />
        <Route path="/element/:id" exact component={ElementDetails} />
      </Switch>
    </div>
  );
};

export default App;
