var express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', (req, res) => {
	const { credentials } = req.body;
	User.findOne({ email: credentials.email }).then(user => {
		if (user && user.isValidPassword(credentials.password)) {
			res.json({ user: user.toAuthJSON() });
		} else {
			res.status(400).json({ errors: { global: 'Invalid credentials' }});
		}
	})
});

router.post('/confirmation', (req, res) => {
	const token = req.body.token;
	User.findOneAndUpdate(
		{ confirmationToken: token }, 
		{ confirmationToken: "", confirmed: true},
		{ new: true }
	).then(user =>
		user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({})
	);
});

module.exports = router;