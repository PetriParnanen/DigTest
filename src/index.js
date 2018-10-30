import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import App from './components/App';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>, 
	document.getElementById('root'));

registerServiceWorker();
