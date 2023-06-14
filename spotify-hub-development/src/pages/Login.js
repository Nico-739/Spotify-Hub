import React from 'react';
import { handleRedirect } from '../components/Authentication/AuthService';

const LoginPage = () => {
  const handleLoginClick = () => {
    handleRedirect();
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLoginClick}>Log in with Spotify</button>
    </div>
  );
};

export default LoginPage;
