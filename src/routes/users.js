const express = require('express');
const User = require('../models/User');
const parseErrors = require('../utils/parseErrors');
//const sendConfirmationEmail = require('../mailer').sendConfirmationEmail;

const router = express.Router();

router.post('/', (req, res) => {
	const { email, password } = req.body.user;

	const user = new User({ email });
	user.setPassword(password);
	//used in confirmation email
	//user.setConfirmationToken();
	user.save()
		.then(userRecord => res.json({ user: userRecord.toAuthJSON() }))
		/* Will not be using confirmation mailer, but leave code
		.then(userRecord => {
			sendConfirmationEmail(userRecord);
			res.json({ user: userRecord.toAuthJSON() });
		}) */
		.catch(err => res.status(400).json({ errors: parseErrors(err.errors) } ));	
});

module.exports = router;