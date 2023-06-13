import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/Login';

const App = () => {
  useEffect(() => {
    handleRedirect();
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Spotify Hub</h1>
        <p>Please log in with your Spotify account to continue.</p>
        <a href="/login">Log in with Spotify</a>
      </header>
    </div>
  );
};

export default App;
