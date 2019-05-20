import { combineReducers } from 'redux';

import user from './reducers/user';
import locale from './reducers/locale';
import contacts from './reducers/contact';

// export default
const appReducer = combineReducers({
	user,
	locale,
	contacts
});

const rootReducer = (state, action) => {
	let newState = state;
	if (action.type === 'USER_LOGGED_OUT'){
		newState = undefined;
	}

	return appReducer(newState, action)
}

export default rootReducer;