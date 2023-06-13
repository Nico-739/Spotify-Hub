import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/Login';
import { handleRedirect } from './components/Authentication/AuthService';

const App = () => {
  useEffect(() => {
    handleRedirect();
  }, []);

  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <h1>Spotify Hub</h1>
        </header>
        <Switch>
          <Route exact path='/login' component={LoginPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
