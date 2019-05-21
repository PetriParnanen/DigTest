import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import LoginForm from '../forms/LoginForm';
import { login } from '../../actions/auth';

class LoginPage extends React.Component {
	submit = (data) => 
		this.props.login(data).then(() => this.props.history.push("/persons"));

	render(){
		return (
			<div>
				<h1>
					<FormattedMessage id="login.page" defaultMessage="Login" />
				</h1>

				<LoginForm submit={this.submit} />

				<Link to="/forgot_password">
					<FormattedMessage id="login.forgotpassword" defaultMessage="Forgotten password" />
				</Link>
			</div>
		);
	}
}

LoginPage.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);