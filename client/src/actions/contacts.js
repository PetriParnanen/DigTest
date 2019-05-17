import { normalize } from 'normalizr';
import { CONTACTS_FETCHED, CONTACT_CREATED, CONTACT_UPDATED } from '../types';
import api from '../api';
import { contactSchema } from '../schemas';

// data.entities.books, normalized redux data
const contactsFetched = (data) => ({
	type: CONTACTS_FETCHED,
	data
});

const contactCreated = (data) => ({
	type: CONTACT_CREATED,
	data
});

const contactUpdated = (data) => ({
	type: CONTACT_UPDATED,
	data
});

export const fetchContacts = () => (dispatch) =>
  api.contacts.fetchAll()
    .then(contacts => 
    	dispatch(contactsFetched( normalize(contacts, [contactSchema])))
    );

export const createContact = (data) => (dispatch) => 
	api.contacts.create(data)
		.then(contact => 
			dispatch(contactCreated( normalize(contact, contactSchema)))
		);

export const updateContact = (data) => (dispatch) => 
	api.contacts.update(data)
		.then(contact => 
			dispatch(contactUpdated( normalize(contact, contactSchema)))
		);
