import React, { useEffect } from 'react';
import './App.css';
import { handleRedirect } from './components/Authentication/AuthService';

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
