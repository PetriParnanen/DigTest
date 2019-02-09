const express = require('express');
const User = require('../models/User');
const parseErrors = require('../utils/parseErrors');
const sendConfirmationEmail = require('../mailer').sendConfirmationEmail;

const router = express.Router();

router.post('/', (req, res) => {
	const { email, password } = req.body.user;

	const user = new User({ email });
	user.setPassword(password);
	//used in confirmation email
	user.setConfirmationToken();
	user.save(function(err, userRecord){
		if(err){
			res.status(400).json({ errors: parseErrors(err.errors) });
		}
		if(!userRecord){
			res.status(400).json({ errors: "Jokin meni pieleen. Yritä uudestaan"});
		}
		sendConfirmationEmail(userRecord);
		res.json({ user: userRecord.toAuthJSON() });
	});	
});

module.exports = router;