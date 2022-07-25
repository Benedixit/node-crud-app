const mongoose = require('mongoose')

const passportLocalMongoose = require('passport-local-mongoose')

let Schema = mongoose.Schema

const profileSchema = new Schema({
	bio: {
		type: String
	},
	avatar: {
		type: String
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
})

const Profile = mongoose.model('Profile', profileSchema, "Profiles")


module.exports = Profile
