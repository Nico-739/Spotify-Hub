import React, { useEffect, useState } from 'react';
import LoginPage from './pages/Login';
import HubPage from './pages/Hub';
import { handleRedirect } from './components/Authentication/AuthService';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    handleRedirect();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Spotify Hub</h1>
      </header>
      {!isAuthenticated && <LoginPage onLogin={handleLogin} />}
      {isAuthenticated && <HubPage />}
    </div>
  );
};

export default App;
