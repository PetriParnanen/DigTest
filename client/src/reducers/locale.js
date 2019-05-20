import { LOCALE_SET } from '../types';

export default function locale(state = { lang: 'fi'}, action = {}) {
	switch(action.type) {
		case LOCALE_SET:
			return { lang: action.lang };
		default: 
			return state;
	}
}