import { schema } from 'normalizr';

export const contactSchema = new schema.Entity(
	"contacts",
	{}, 
	{ idAttribute: "_id" }
);

export { contactSchema as default }