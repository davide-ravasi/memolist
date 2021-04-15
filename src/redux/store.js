import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

import Reducers from "./root-reducer";
import { loadState, saveState } from "../storage/localStorage.utils";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  Reducers,
  loadState(),
  composeEnhancers(applyMiddleware(thunk))
);

// subscribe to store to create and update localstorage store datas
store.subscribe(() => {
  saveState({
    categories: store.getState().categories,
    list: store.getState().list,
    system: store.getState().system,
    wishlist: store.getState().wishlist,
  });
});

export default store;
