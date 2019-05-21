import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedMessage } from 'react-intl';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ConfirmationPage from './pages/ConfirmationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PersonListPage from './pages/PersonListPage';
import UserRoute from './routes/UserRoute';
import GuestRoute from './routes/GuestRoute';
import { setLocale } from '../actions/locale';
import messages from './messages';

const localeStyle = {
  float: 'right'
};

const App = ({ location, lang, setLocaleAction }) => (
  <IntlProvider locale={lang} 
  messages={messages[lang]}
  key={lang} >
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">
        <FormattedMessage id="nav.title" defaultMessage="Yhteystiedot" />
      </h1>
    </header>
    <div style={ localeStyle }>
      <button type="button" className="ui button primary" onClick={() => setLocaleAction('en')}>EN</button>
      <button type="button" className="ui button primary" onClick={() => setLocaleAction('fi')}>FI</button>
    </div>
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
  </IntlProvider>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  lang: PropTypes.string.isRequired,
  setLocaleAction: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    lang: state.locale.lang
  }
}

export default connect(mapStateToProps, { setLocaleAction: setLocale })(App);
