const nodemailer = require('nodemailer');

const from = '"PMP Data" <pemipa.data@gmail.com>';

function setup() {
	return nodemailer.createTransport({
		service: 'Gmail',
		//host: process.env.EMAIL_HOST,
		//port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		}
	});
}

var _sendConfirmationEmail = function(user) {
	const tranport = setup();
	const email = {
		from,
		to: user.email,
		subject: "Welcome to personal contactbook",
		text: `
			Welcome, confirm you email.
			
			${user.generateConfirmationUrl()}
			`
	}

	tranport.sendMail(email);
};

var _sendResetPasswordRequest = function(user) {
	const tranport = setup();
	const email = {
		from,
		to: user.email,
		subject: "Reset password",
		text: `
			To reset password follow this link
			
			${user.generateResetPasswordLink()}
			`
	}

	tranport.sendMail(email);
};

module.exports = {
	sendConfirmationEmail : _sendConfirmationEmail,
	sendResetPasswordRequest : _sendResetPasswordRequest
};
