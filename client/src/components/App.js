import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ConfirmationPage from './pages/ConfirmationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PersonListPage from './pages/PersonListPage';
import UserRoute from './routes/UserRoute';
import GuestRoute from './routes/GuestRoute';

const App = ({ location }) => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">Yhteystiedot</h1>
    </header>

    <div className="ui container">
      <Route location={location} path="/" exact component={HomePage} />
      <Route location={location} path="/confirmation/:token" exact component={ConfirmationPage} />
      <GuestRoute location={location} path="/login" exact component={LoginPage} />
      <GuestRoute location={location} path="/signup" exact component={SignupPage} />
      <GuestRoute location={location} path="/forgot_password" exact component={ForgotPasswordPage} />
      <GuestRoute location={location} path="/reset_password/:token" exact component={ResetPasswordPage} />
      <UserRoute location={location} path="/persons" component={PersonListPage} />
    </div>

  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default App;
