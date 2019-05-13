import { combineReducers } from 'redux';

import user from './reducers/user';
import contacts from './reducers/contact';

export default combineReducers({
	user,
	contacts
});