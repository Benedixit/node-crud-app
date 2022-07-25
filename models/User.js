const mongoose = require('mongoose')

const passportLocalMongoose = require('passport-local-mongoose')

let Schema = mongoose.Schema


let userSchema = new Schema ({
	name: {
		type: String,
	    required: true
	},
	username:{
		type: String,
		required: true,
	    unique: true},
	email: {
		type: String,
	    required: true,
	    unique: true},
})

let options = {
    errorMessages: {
        UserExistsError: 'A user with the given username is already registered'
    }
}

userSchema.plugin(passportLocalMongoose, options);

const User = mongoose.model('UserModel', userSchema, "Users")


module.exports = User
