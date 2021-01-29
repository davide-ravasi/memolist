import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from 'react-redux';
//import { fetchList } from './actions/';

/// https://daveceddia.com/tailwind-create-react-app
import "./tailwind.output.css";
import "./styles.css";

import {fetchCategories} from './actions/index';

import { auth, signInGoogle, addUserData } from "./firebase";
import Header from "./components/header";
import ElementDetails from "./components/ElementDetails";
import ElementList from "./components/ElementList";
import ElementAdd from "./components/ElementAdd";
import ElementEdit from "./components/ElementEdit";
import { setCurrentUser } from './actions';

const signIn = (e) => {
  e.preventDefault();
  signInGoogle()
};

const signOut = (e) => {
  e.preventDefault();
  auth.signOut();
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // @TODO : you have to add the unsuscribe method for this listener
    auth.onAuthStateChanged( async user => {
      if (user) {
        // User is signed in.
        const userRef = await addUserData(user);
        await dispatch(setCurrentUser(user));
          
      } else {
        // User is signed out
        await dispatch(setCurrentUser(null));
      }
    });
  }, []);

  useEffect(() => {
      dispatch(fetchCategories());
  },[dispatch]);

  // useEffect(() => {
  //   dispatch(fetchList());
  // },[]);

  return (
    <div>
      <Header signIn={signIn} signOut={signOut} />
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
