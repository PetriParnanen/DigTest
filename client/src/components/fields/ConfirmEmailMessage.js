import React from 'react';
import { Message } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

const ConfirmEmailMessage = () => (
	<Message info>
		<Message.Header>
			<FormattedMessage id="confirm.email" defaultMessage="Confirm your email adress" />
		</Message.Header>
	</Message>
);

export default ConfirmEmailMessage;