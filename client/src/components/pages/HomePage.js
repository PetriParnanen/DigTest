import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

const HomePage = ({ isAuthenticated, logout }) => (
	<div>
		<h1>Etusivu</h1>
		{ isAuthenticated ? (
			<Link to="/persons">Siirry sisälle</Link>
		):( 
			<div>
				<Link to="/login">Kirjaudu</Link> or <Link to="/signup">Rekisteröidy</Link>
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