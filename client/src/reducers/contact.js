import { createSelector } from 'reselect';
import { CONTACTS_FETCHED, CONTACT_CREATED, CONTACT_UPDATED } from '../types';

export default function contacts(state = {}, action = {}) {
	switch(action.type) {
		case CONTACTS_FETCHED:
		case CONTACT_CREATED:
		case CONTACT_UPDATED:
			return { ...state, ...action.data.entities.contacts };
		default:
			return state;
	}
}

// selectors
export const contactsSelector = state => state.contacts;

export const allContactsSelector = createSelector(
	contactsSelector,
	contactsHash => Object.values(contactsHash)
);