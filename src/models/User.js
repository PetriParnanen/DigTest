const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');


// add uniqueness and email validation
const schema = new mongoose.Schema({
	email: { type: String, required: true, lowercase: true, index: true, unique: true },
	passwordHash: { type: String, require: true },
	confirmed: { type: Boolean, default: false },
	confirmationToken: { type: String, default: "" },
	passwordToken: { type: String, default: "" }
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

schema.methods.setResetPasswordToken = function setResetPasswordToken(){
	this.passwordToken = this.generateResetPasswordToken();
};

schema.methods.generateConfirmationUrl = function generateConfirmationUrl(){
	return `${process.env.HOST}/confirmation/${this.confirmationToken}`
};

schema.methods.generateResetPasswordLink = function generateResetPasswordLink(){
	return `${process.env.HOST}/reset_password/${this.passwordToken}`
};

schema.methods.generateJWT = function generateJWT() {
	const token = jwt.sign({
		email: this.email,
		confirmed: this.confirmed
	}, process.env.JWT_SECRET);
	return token;
};

schema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
	return jwt.sign({
		_id: this._id
	}, process.env.JWT_SECRET,
	{ expiresIn: "1h" });
};

schema.methods.toAuthJSON = function toAuthJSON() {
	return {
		email: this.email,
		confirmed: this.confirmed,
		token: this.generateJWT()
	}
};

schema.plugin(uniqueValidator, { message: 'Tunnus on jo olemassa'});

module.exports = mongoose.model('User', schema);