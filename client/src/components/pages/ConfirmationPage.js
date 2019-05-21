import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { confirm } from '../../actions/auth';

class ConfirmationPage extends React.Component {
	state = {
		loading: true,
		success: false,
		errors: {}
	};

	componentDidMount() {
		this.props.confirm(this.props.match.params.token)
			.then(() => this.setState({ loading: false, success: true }))
			.catch(() => this.setState({ loading: false, success: false }));
	}

	render() {
		const { loading, success, errors } = this.state;

		return (
			<div>
				{ loading && (
					<Message icon>
						<Icon name="circle notched" loading />
						<Message.Header>
							<FormattedMessage id="confirm.check" defaultMessage="Checking email" />
						</Message.Header>
					</Message>
				)}

				{!loading && success && (
					<Message success icon>
						<Icon name="checkmark" />
						<Message.Content>
							<Message.Header>
								<FormattedMessage id="confirm.confirm" defaultMessage="Email has been confirmed" />
							</Message.Header>
							<Link to="/persons">
								<FormattedMessage id="confirm.move" defaultMessage="Move forward" />
							</Link>
						</Message.Content>
					</Message>
				)}

				{!loading && !success && (
					<Message negative icon>
						<Icon name="warning sign" />
						<Message.Content>
							<Message.Header>
								<FormattedMessage id="confirm.error" defaultMessage="Confirmation failed" />
							</Message.Header>
							{errors.message}<br />
							{ (errors.type === "exists") && (
								<Link to="/login">
									<FormattedMessage id="confirm.errormove" defaultMessage="CMove to login" />
								</Link>
							)}
						</Message.Content>
					</Message>
				)}
			</div>
		);
	}
}

ConfirmationPage.propTypes = {
	confirm: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			token: PropTypes.string.isRequired
		}).isRequired
	}).isRequired
};

export default connect(null, { confirm })(ConfirmationPage);