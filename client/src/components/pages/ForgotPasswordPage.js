import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import { resetPasswordRequest } from '../../actions/auth';

class ForgotPasswordPage extends React.Component {
	state = {
		success: false
	}

	submit = data => 
		this.props.resetPasswordRequest(data)
			.then(() => this.setState({ success: true }));

	render() {
		const { success } = this.state;
		return (
			<div>
			{success ? 
				(
					<Message positive>
						<FormattedMessage id="forgot.send" defaultMessage="Email has been send" />
					</Message>
				) : (
					<ForgotPasswordForm submit={this.submit} />
				)
			}
			</div>
		);
	}
}

ForgotPasswordPage.propTypes = {
	resetPasswordRequest: PropTypes.func.isRequired
}

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);