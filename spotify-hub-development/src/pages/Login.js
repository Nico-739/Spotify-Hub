import React from 'react';
import { login } from '../components/Authentication/AuthService';

const LoginPage = () => {
  const handleLoginClick = () => {
    login();
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLoginClick}>Log in with Spotify</button>
    </div>
  );
};

export default LoginPage;
