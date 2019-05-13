const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = function(req, res, next) {
	const header = req.headers.authorization;
	let token;
	const arrIndex = 1;

	if (header) token = header.split(' ')[arrIndex];

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err){
				res.status(401).json({ errors: { global: "Invalid token"}});
			} else {
				User.findOne({ email: decoded.email })
					.then(user => {
						req.currentUser = user;
						next();
					}
				);
			}
		})
	} else {
		res.status(401).json({ errors: { global: "No token" }});
	}
} 