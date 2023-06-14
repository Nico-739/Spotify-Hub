import React, { useEffect, useState } from 'react';
import LoginPage from './pages/Login';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');

  useEffect(() => {
    handleRedirect();
  }, []);

  const handleRedirect = () => {
    const url = new URL(window.location.href);
    if (url.searchParams.get('access_token')) {
      setCurrentPage('hub');
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Spotify Hub</h1>
      </header>
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'hub' && <div>Welcome to the Hub!</div>}
    </div>
  );
};

export default App;
