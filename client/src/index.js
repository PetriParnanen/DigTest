import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fi from 'react-intl/locale-data/fi';
import decode from 'jwt-decode';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';
import { userLoggedIn } from './actions/auth';
import { localeSet } from './actions/locale';
import setAuthorizationHeader from './utils/setAuthorizationHeader';

addLocaleData(en);
addLocaleData(fi);

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.connectJWT) {
	const payload = decode(localStorage.connectJWT);
	const user = { 
		token: localStorage.connectJWT, 
		email: payload.email, 
		confirmed: payload.confirmed 
	};
	setAuthorizationHeader(localStorage.connectJWT);
	store.dispatch(userLoggedIn(user));
}

if (localStorage.contLang){
	store.dispatch(localeSet(localStorage.contLang));
}

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Route component={App} />
		</Provider>
	</BrowserRouter>, 
	document.getElementById('root'));

registerServiceWorker();
