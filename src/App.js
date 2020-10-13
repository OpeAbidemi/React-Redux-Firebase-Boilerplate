import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';



function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth))
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <p>Loading ...</p>
      </header>
    </div>
    );
  return children;
}



function App() {
  return (
    <AuthIsLoaded>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </AuthIsLoaded>
  );
}

export default App;
