import React from 'react';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';
import { Form, Button, Message } from 'semantic-ui-react';
import InlineError from '../fields/InlineError';

class ForgotPasswordForm extends React.Component {
	state = {
		data: {
			email: ''
		},
		loading: false,
		errors: {}
	};

	onChange = e => {
		const { data } = this.state;
		this.setState({
			data: { ...data, [e.target.name]: e.target.value }
		});
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

	validate = data => {
		const errors = {};
		if (!isEmail(data.email)) errors.email = "Virheellinen sähköpostiosoite";
		return errors;
	};

	render() {
		const { data, errors, loading } = this.state;

		return (
			<Form onSubmit={this.onSubmit} loading={loading}>
				{ !!errors.global && <Message negative>
					<Message.Header>Jotain meni pieleen</Message.Header>
					<p>{ errors.global }</p>
					</Message>
				}
				<Form.Field error={!!errors.email}>
					<label htmlFor="email">Email
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
				<Button primary>Lähetä</Button>
			</Form>
		);
	}
}

ForgotPasswordForm.propTypes = {
	submit: PropTypes.func.isRequired
}

export default ForgotPasswordForm;