import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import InlineError from '../fields/InlineError';

class ResetPasswordForm extends React.Component {
	state = {
		data: {
			token: this.props.token,
			password: '',
			passwordConfirmation: ''
		},
		loading: false,
		errors: {}
	};

	onChange = e => 
		this.setState({
			...this.state,
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});

	onSubmit = e => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data)
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
		}
	};

	validate = data => {
		const errors = {};
		if (!data.password) errors.password = "Salasana on pakollinen";
		if (data.password !== data.passwordConfirmation) errors.password = "Salasanojen pitää olla samat";
		return errors;
	};

	render() {
		const { data, errors, loading } = this.state;

		return (
			<Form onSubmit={this.onSubmit} loading={loading}>
				{ errors.global && <Message negative>
					<Message.Header>Jotain meni pieleen</Message.Header>
					<p>{ errors.global }</p>
					</Message>
				}
				<Form.Field error={!!errors.password}>
					<label htmlFor="password">Uusi salasana</label>
					<input 
						type="password" 
						id="password" 
						name="password" 
						placeholder="your new password" 
						value={data.password} 
						onChange={this.onChange} />
						{ errors.password && <InlineError text={errors.password} />}
				</Form.Field>
				<Form.Field error={!!errors.password}>
					<label htmlFor="password">Salasanan vahvistus</label>
					<input 
						type="password" 
						id="passwordConfirmation" 
						name="passwordConfirmation" 
						placeholder="password confirmation" 
						value={data.passwordConfirmation} 
						onChange={this.onChange} />
				</Form.Field>
				<Button primary>Resetoi</Button>
			</Form>
		);
	}
}

ResetPasswordForm.propTypes = {
	submit: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired
}

export default ResetPasswordForm;