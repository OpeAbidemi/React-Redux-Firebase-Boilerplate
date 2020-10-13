import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
  getFirestore,
  firestoreReducer,
  createFirestoreInstance,
} from "redux-firestore";
import {
  getFirebase,
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";

// firebase config
const firebaseConfig = {
  //add your firebase config here :)
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  attachAuthIsReady: true,
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

firebase.firestore();

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
});

// Create store with reducers and initial state
const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
  )
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};



ReactDOM.render(
  <React.StrictMode>
  <ReactReduxFirebaseProvider {...rrfProps}>
    <Provider store={store}>
      <App/>
    </Provider>
  </ReactReduxFirebaseProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
