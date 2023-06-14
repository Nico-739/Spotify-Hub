import React from 'react';
import { handleLogin } from '../components/Authentication/AuthService';

const LoginPage = () => {
  const handleLoginClick = () => {
    handleLogin();
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLoginClick}>Log in with Spotify</button>
    </div>
  );
};

export default LoginPage;
