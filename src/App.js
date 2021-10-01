import React, { Suspense, useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, signInGoogle, manageUserData } from "./firebase";
import ReactGA from 'react-ga';

/// https://daveceddia.com/tailwind-create-react-app
import "./tailwind.output.css";
import "./styles.css";
import "./outils/fontAwesome";

import { fetchCategories } from "./redux/categories/categories.actions";
import { setCurrentUser } from "./redux/user/user.actions";
import { cleanErrorMsg, cleanFeedbackMsg } from "./redux/system/system.actions";

import Header from "./components/Header";
import RouteChangeTracker from './components/RouteChangeTracker';
import Modal from "./components/ModalPortal";
import FeedbackModal from "./components/FeedbackModal";

// https://javascript.plainenglish.io/how-to-setup-and-add-google-analytics-to-your-react-app-fd361f47ac7b
// const TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID; //YOUR_OWN_TRACKING_ID
ReactGA.initialize("UA-44845508-2");
ReactGA.pageview(window.location.pathname + window.location.search);

const ElementDetails = React.lazy(() => import("./components/ElementDetails"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const Wishlist = React.lazy(() => import("./pages/Wishlist"));
const Categories = React.lazy(() => import("./pages/Categories"));
const ElementAdd = React.lazy(() => import("./components/ElementAdd"));
const ElementEdit = React.lazy(() => import("./components/ElementEdit"));
const FlashCardAdd = React.lazy(() => import("./components/FlashCardAdd"));
const Login = React.lazy(() => import("./components/Login"));


const signIn = (e) => {
  e.preventDefault();
  signInGoogle();
};

const signOut = (e) => {
  e.preventDefault();
  auth.signOut();
};

const App = (props) => {
  const systMsg = (state) => state.system;
  const { error, feedBackMessage } = useSelector(systMsg);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // @TODO : you have to add the unsuscribe method for this listener
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in.
        const userManaged = await manageUserData(user);
        await dispatch(setCurrentUser(userManaged));

        // if on page connection and user exists
        if (location.pathname === "/connection") {
          history.push("/");
        }
      } else {
        // User is signed out
        await dispatch(setCurrentUser(null));
      }
    });

    dispatch(fetchCategories());
  }, [dispatch, location, history]);

  useEffect(() => {
    console.log(feedBackMessage);
    if (feedBackMessage) {
      setTimeout(() => {
        dispatch(cleanFeedbackMsg());
        history.push("/");
      }, 4000);
    }
    if (error) {
      setTimeout(() => {
        dispatch(cleanErrorMsg());
        history.push("/");
      }, 4000);
    }
  }, [feedBackMessage, error, dispatch, history]);

  return (
    <div>
      <Header signIn={signIn} signOut={signOut} />
      <RouteChangeTracker />
      <Suspense fallback={<div>---loading</div>} >
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/wishlist" exact component={Wishlist} />
          <Route path="/categories" exact component={Categories} />
          <Route path="/element/add" exact component={ElementAdd} />
          <Route path="/element/edit/:id" exact component={ElementEdit} />
          <Route path="/element/:id" exact component={ElementDetails} />
          <Route path="/flashcard/add" exact component={FlashCardAdd} />
          <Route path="/connection" exact component={Login} />
        </Switch>
      </Suspense>
      <Modal>
        <FeedbackModal feedbackMsg={feedBackMessage} error={error} />
      </Modal>
    </div>
  );
};

export default App;
