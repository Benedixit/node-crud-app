const mongoose = require('mongoose')

const passportLocalMongoose = require('passport-local-mongoose')

let Schema = mongoose.Schema

const postSchema = new Schema({
	caption: {
		type: String
	},
	image: {
		type: String
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
})

const Post = mongoose.model('Post', postSchema, "Posts")


module.exports = Post
