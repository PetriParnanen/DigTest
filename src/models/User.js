const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');


// add uniqueness and email validation
const schema = new mongoose.Schema({
	email: { type: String, required: true, lowercase: true, index: true, unique: true },
	passwordHash: { type: String, require: true },
	confirmed: { type: Boolean, default: false },
	confirmationToken: { type: String, default: "" }
}, { timestamps: true });

schema.methods.isValidPassword = function isValidPassword(password) {
	return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.setPassword = function setPassword(password){
	this.passwordHash = bcrypt.hashSync(password, 10);
};

schema.methods.setConfirmationToken = function setConfirmationToken(){
	this.confirmationToken = this.generateJWT();
};

schema.methods.generateConfirmationUrl = function generateConfirmationUrl(){
	return `${process.env.HOST}/confirmation/${this.confirmationToken}`
}

schema.methods.generateJWT = function generateJWT() {
	return jwt.sign({
		email: this.email,
		confirmed: this.confirmed
	}, process.env.JWT_SECRET);
};

schema.methods.toAuthJSON = function toAuthJSON() {
	return {
		email: this.email,
		confirmed: this.confirmed,
		token: this.generateJWT()
	}
};

schema.plugin(uniqueValidator, { message: 'This email allready exists'});

module.exports = mongoose.model('User', schema);