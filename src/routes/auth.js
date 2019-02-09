var express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendResetPasswordRequest = require('../mailer').sendResetPasswordRequest;

const router = express.Router();

router.post('/', (req, res) => {
	const { credentials } = req.body;
	User.findOne({ email: credentials.email }).then(user => {
		if (user && user.isValidPassword(credentials.password)) {
			res.json({ user: user.toAuthJSON() });
		} else {
			res.status(400).json({ errors: { global: 'Virheelliset tunnistustiedot' }});
		}
	})
});

// Confirmation of user login credentials
router.post('/confirmation', (req, res) => {
	const token = req.body.token;
	User.findOne({ confirmationToken: token }).then(user => {
		if (user){
			if (user.confirmed) {
				res.status(400).json({ errors: { message: "Tunnus on jo aktivoitu", type: "exists" } });
			} else {
				User.findOneAndUpdate(
					{ confirmationToken: token }, 
					{ confirmed: true},
					{ new: true }
				).then(user => {
					if (user){
						res.json({ user: user.toAuthJSON() })
					}
				})
			}
		} else {
			res.status(400).json({ errors: { message: "Virheellinen linkki", type: "link" } })
		}
	})
});

// Changing password
router.post('/reset_password_request', (req, res) => {
	const email = req.body.email;

	User.findOne({ email: email }).then(user => {
		if (user) {
			user.setResetPasswordToken();
			user.save()
				.then(userRecord => {
					sendResetPasswordRequest(userRecord);
					res.json({});
				})
				.catch(err =>
					res.status(400).json({ errors: { global: "Järjestelmä virhe" }})
				)
		} else {
			res.status(400).json({ errors: { global: "Virheellinen sähköposti osoite"} })
		}
	})
});

// validate reset password token
router.post('/validate_token', (req, res) => {
	const token = req.body.token;

	jwt.verify(token, process.env.JWT_SECRET, err => {
		if (err) {
			res.status(401).json({});
		} else {
			User.findOne({ passwordToken: token }).then(user => {
				if (user){
					res.json({});
				} else {
					res.status(400).json({ errors: { message: "Virheellinen linkki", type: "link" } })
				}
			})
		}
	});
});

// New password
router.post('/reset_password', (req, res) => {
	const { password, token } = req.body.data;
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			res.status(401).json({ errors: { global: "Virheelliset tiedot" }});
		} else {
			User.findOne( { _id: decoded._id }).then(user => {
				if (user) {
					user.setPassword(password);
					user.set({ passwordToken: "" });
					user.save().then(() => res.json({}));
				} else {
					res.status(404).json({ errors: { global: "Virheelliset tiedot" }})
				}
			})
		}
	})
});

module.exports = router;