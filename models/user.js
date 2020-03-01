const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: { type: String, required: true },
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	adminstrator: { type: Boolean, default: true },
});

UserSchema.virtual('url').get(function() {
	return '/users/' + this.id; 
});

UserSchema.virtual('name').get(function() {
	return this.firstname + ' ' + this.lastname;
});

module.exports = mongoose.model('User', UserSchema);
