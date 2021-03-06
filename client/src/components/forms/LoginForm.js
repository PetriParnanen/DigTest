import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import InlineError from "../fields/InlineError";

class LoginForm extends React.Component {
	state = {
		data: {
			email: '',
			password: ''
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
			const { submit } = this.props;
			submit(data)
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
		}
	};

	validate = (data) => {
		const errors = {};
		const { formatMessage } = this.props.intl;
		if (!data.password) errors.password = formatMessage({ id: 'error.mandatorypassword'});
		if (!Validator.isEmail(data.email)) errors.email = formatMessage({ id: 'error.email'});
		return errors;
	};

	render() {

		const { data, errors, loading } = this.state;

		return (
			<Form onSubmit={this.onSubmit} loading={loading}>
				{ errors.global && <Message negative>
					<Message.Header>
						<FormattedMessage id="login.globalerror" defaultMessage="Something went wrong" />
					</Message.Header>
					<p>{ errors.global }</p>
					</Message>
				}
				<Form.Field error={!!errors.email}>
					<label htmlFor="email">
						<FormattedMessage id="login.email" defaultMessage="Email" />
					<input 
						type="email" 
						id="email" 
						name="email" 
						placeholder="example@example.com" 
						value={data.email} 
						onChange={this.onChange} />
						</label>
						{ errors.email && <InlineError text={errors.email} />}
				</Form.Field>
				<Form.Field error={!!errors.password}>
					<label htmlFor="password">
						<FormattedMessage id="login.password" defaultMessage="Password" />
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
				<Button primary>
					<FormattedMessage id="login.button" defaultMessage="Login" />
				</Button>
			</Form>
		);
	}
}

LoginForm.propTypes = {
	submit: PropTypes.func.isRequired,
	intl: intlShape.isRequired
}

export default injectIntl(LoginForm);