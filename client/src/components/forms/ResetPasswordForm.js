import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import InlineError from '../fields/InlineError';

class ResetPasswordForm extends React.Component {
	state = {
		data: {
			password: '',
			passwordConfirmation: ''
		},
		loading: false,
		errors: {}
	};

	onChange = e => {
		const { data } = this.state;
		this.setState({ 
			data: { ...data, [e.target.name]: e.target.value }
		})
	};

	onSubmit = e => {
		e.preventDefault();
		const { data } = this.state;
		const errors = this.validate(data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			const { submit, token } = this.props;
			data.token = token;
			submit(data)
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
		}
	};

	validate = data => {
		const errors = {};
		const { formatMessage } = this.props.intl;
		if (!data.password) errors.password = formatMessage({ id: 'error.mandatorypassword'});
		if (data.password !== data.passwordConfirmation) errors.password = formatMessage({ id: 'error.samepassword'});
		return errors;
	};

	render() {
		const { data, errors, loading } = this.state;

		return (
			<Form onSubmit={this.onSubmit} loading={loading}>
				{ errors.global && <Message negative>
					<Message.Header>
						<FormattedMessage id="reset.globalerror" defaultMessage="Something went wrong" />
					</Message.Header>
					<p>{ errors.global }</p>
					</Message>
				}
				<Form.Field error={!!errors.password}>
					<label htmlFor="password">
						<FormattedMessage id="reset.newpassword" defaultMessage="New password" />
					<input 
						type="password" 
						id="password" 
						name="password" 
						placeholder="" 
						value={data.password} 
						onChange={this.onChange} />
					</label>
						{ errors.password && <InlineError text={errors.password} />}
				</Form.Field>
				<Form.Field error={!!errors.password}>
					<label htmlFor="password">
						<FormattedMessage id="reset.confirmpassword" defaultMessage="Confirm new password" />
					<input 
						type="password" 
						id="passwordConfirmation" 
						name="passwordConfirmation" 
						placeholder="password confirmation" 
						value={data.passwordConfirmation} 
						onChange={this.onChange} />
					</label>
				</Form.Field>
				<Button primary>
					<FormattedMessage id="reset.button" defaultMessage="Reset" />
				</Button>
			</Form>
		);
	}
}

ResetPasswordForm.propTypes = {
	submit: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired,
	intl: intlShape.isRequired
}

export default injectIntl(ResetPasswordForm);