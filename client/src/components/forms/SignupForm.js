import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import { Form, Button } from 'semantic-ui-react';
import InlineError from "../fields/InlineError";

class SignupForm extends React.Component {
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
		if (!data.password) errors.password = "Salasana on pakollinen";
		if (!Validator.isEmail(data.email)) errors.email = "Virheellinen sähköposti";
		return errors;
	}

	render() {
		const { data, errors, loading } = this.state;

		return (
			<Form onSubmit={this.onSubmit} loading={loading}>
				<Form.Field error={!!errors.email}>
					<label htmlFor="email">Sähköpostiosoite
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
					<label htmlFor="password">Salasana
					<input 
						type="password" 
						id="password" 
						name="password" 
						placeholder="Tee hyvä" 
						value={data.password} 
						onChange={this.onChange} />
					</label>
						{ errors.password && <InlineError text={errors.password} />}
				</Form.Field>
				<Button primary>Rekisteröidy</Button>
			</Form>
		);
	}
}

SignupForm.propTypes = {
	submit: PropTypes.func.isRequired
}

export default SignupForm;