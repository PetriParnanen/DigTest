import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../actions/auth';

const HomePage = ({ isAuthenticated, logout }) => (
	<div>
		<h1>
			<FormattedMessage id="home.page" defaultMessage="Homepage" />
		</h1>
		{ isAuthenticated ? (
			<button type="button" onClick={ () => logout() }>
				<FormattedMessage id="home.logout" defaultMessage="Logout" />
			</button>
		):( 
			<div>
				<Link to="/login">
					<FormattedMessage id="home.login" defaultMessage="Login" />
				</Link>
				&nbsp;<FormattedMessage id="or" defaultMessage="or" />&nbsp;
				<Link to="/signup">
					<FormattedMessage id="home.register" defaultMessage="Register" />
				</Link>
			</div>
		)}
	</div>
);

HomePage.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired
};

function mapStateToProps(state){
	return {
		isAuthenticated: !!state.user.token
	}
}

export default connect(mapStateToProps, { logout: actions.logout })(HomePage);