import React from 'react';
import { Message } from 'semantic-ui-react';

const ConfirmEmailMessage = ({ text }) => (
	<Message info>
		<Message.Header>Varmista sähköposti osoitteesi</Message.Header>
	</Message>
);

export default ConfirmEmailMessage;