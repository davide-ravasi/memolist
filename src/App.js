import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { auth, signInGoogle, manageUserData } from "./firebase";

/// https://daveceddia.com/tailwind-create-react-app
import "./tailwind.output.css";
import "./styles.css";

import {fetchCategories} from './redux/categories/categories.actions';
import { setCurrentUser } from './redux/user/user.actions';
import { cleanFeedbackMsg } from './redux/list/list.actions';
import { cleanErrorMsg } from './redux/system/system.actions';

import Header from "./components/Header";
import ElementDetails from "./components/ElementDetails";
import HomePage from "./pages/HomePage";
import ElementAdd from "./components/ElementAdd";
import ElementEdit from "./components/ElementEdit";
import Login from './components/Login';
import Modal from './components/ModalPortal';
import FeedbackModal from './components/FeedbackModal';

const signIn = (e) => {
  e.preventDefault();
  signInGoogle()
};

const signOut = (e) => {
  e.preventDefault();
  auth.signOut();
};

const App = (props) => {
  console.log(props);
  const selectList = state => state.list;
  const {feedbackMsg} = useSelector(selectList);
  const systMsg = state => state.system;
  const {error} = useSelector(systMsg)
  const dispatch = useDispatch(); 
  const history = useHistory();

  useEffect(() => {
    // @TODO : you have to add the unsuscribe method for this listener
    auth.onAuthStateChanged( async user => {
      if (user) {
        // User is signed in.
        const userManaged = await manageUserData(user);
        await dispatch(setCurrentUser(userManaged));
        history.push('/')
      } else {
        // User is signed out
        await dispatch(setCurrentUser(null));
      }
    });

    dispatch(fetchCategories());

  }, [dispatch]);

  useEffect(() => {
      if(feedbackMsg) {
        setTimeout(() => {
          dispatch(cleanFeedbackMsg())
          history.push('/')
        },4000);
      }
      if(error) {
        setTimeout(() => {
          dispatch(cleanErrorMsg())
          history.push('/')
        },4000);
      }
  },[feedbackMsg, error, dispatch, history]);

  return (
    <div>
      <Header signIn={signIn} signOut={signOut} />
      <Switch>
        <Route path="/" exact component={HomePage} />       
        <Route path="/element/add" exact component={ElementAdd} />
        <Route path="/element/edit/:id" exact component={ElementEdit} />
        <Route path="/element/:id" exact component={ElementDetails} />
        <Route path="/connection" exact component={Login} />
      </Switch>
      <Modal>
            <FeedbackModal feedbackMsg={feedbackMsg} error={error} />
      </Modal>
    </div>
  );
};

export default App;
