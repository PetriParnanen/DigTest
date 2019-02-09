import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { validateToken, resetPassword } from '../../actions/auth';
import ResetPasswordForm from '../forms/ResetPasswordForm';

class ResetPasswordPage extends React.Component {
	state = {
		loading: true,
		success: false
	};

	componentDidMount() {
		this.props.validateToken(this.props.match.params.token)
			.then(() => this.setState({ loading: false, success: true }))
			.catch(() => this.setState({ loading: false, success: false }));
	}

	submit = data => this.props.resetPassword(data).then(() => 
		this.props.history.push('/login'));

	render() {
		const { loading, success } = this.state;
		const token = this.props.match.params.token;

		return (
			<div>
				{ loading && (
					<Message icon>
						<Icon name="circle notched" loading />
						<Message.Header>Loading</Message.Header>
					</Message>
					)}
				{ !loading && success && <ResetPasswordForm submit={this.submit} token={token} />}
				{ !loading && !success && (
					<Message negative icon>
						<Icon name="warning sign" />
						<Message.Content>
							<Message.Header>Virheellinen linkki</Message.Header>
						</Message.Content>
					</Message>
					)}
			</div>
		);
	}
}

ResetPasswordPage.propTypes = {
	validateToken: PropTypes.func.isRequired,
	resetPassword: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			token: PropTypes.string.isRequired
		}).isRequired
	}).isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

export default connect(null, { validateToken, resetPassword })(ResetPasswordPage);