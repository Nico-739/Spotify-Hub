import React from 'react';
import { login } from '../components/Authentication/AuthService'; 

const Login = () => {
  const handleLogin = () => {
    login();
  };

  return (
    <div>
      <h1>Spotify Login</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Login;
