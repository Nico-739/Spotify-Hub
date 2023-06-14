import React, { useEffect, useState } from 'react';
import LoginPage from './pages/Login';
import HubPage from './pages/Hub';
import { handleRedirect } from './components/Authentication/AuthService';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleAuthentication = async () => {
      await handleRedirect();
      setIsAuthenticated(true);
    };

    handleAuthentication();
  }, []);

  return (
    <div className='App'>
      {!isAuthenticated ? <LoginPage /> : <HubPage />}
    </div>
  );
};

export default App;
