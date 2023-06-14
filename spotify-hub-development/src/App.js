import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import HubPage from './pages/Hub';
import { handleRedirect } from './components/Authentication/AuthService';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    handleRedirect().then(() => {
      // Check if the user is authenticated
      const isAuthenticated = !!localStorage.getItem('accessToken');
      setAuthenticated(isAuthenticated);
    });
  }, []);

  return (
    <div>
      {authenticated ? <HubPage /> : <Login />}
    </div>
  );
};

export default App;
