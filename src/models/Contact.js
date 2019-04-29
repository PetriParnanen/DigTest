const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true },
	email: { type: String, require: true },
	phone: { type: String, default: false },
	userId: { type: mongoose.Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('Contact', schema);