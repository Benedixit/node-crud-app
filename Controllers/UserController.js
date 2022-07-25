const User = require('../models/User')
const Profile = require('../models/Profile')
const Post = require('../models/Post')
const passport = require('passport')


exports.signup = (req, res) => {
	const new_user = new User({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
	})
	User.register(new_user, req.body.password, (err, user) => {
		if(err) {
			if(err.toString().includes("E11000 duplicate key error")){
				req.flash('info', 'Email Already in Use')
			}
			if (err.toString().includes("UserExistsError")){
				req.flash('info', "Another account has this username")
			}
			res.redirect('/register')
		}
		passport.authenticate('local')(req, res, () => {res.redirect('/login')})
	})
}

exports.login = (req, res) => {
	res.redirect('/')
}

exports.getSignUp = (req, res) => {
      res.render('register', {title: "Sign Up",
      	                      messages: req.flash('info')
      	                  })
 }

exports.getLogIn = (req, res) => {
	res.render('login', {title: "Log In", messages: req.flash('info')})
}

exports.getLogOut = (req, res, next) => {
	req.logout((err) => {
		if (err){
			return next(err)
		} else {
			req.flash('info', 'You Logged Out Successfully')
			res.redirect('/login')
		}
	})
}

exports.getHome = async (req, res) => {
	const profile = await Profile.findOne({user: req.user})
	const posts = await Post.find({user: req.user})
	res.render('home', {title: `Hello, ${req.user.username}`, 
			                           username: req.user.username,
			                           profile: profile, 
			                           posts: posts, 
			                           user: req.user.name,
			                           messages: req.flash('info')})

}

exports.getDeletePage = (req, res) => {
	res.render('delete-user', {title: "Delete This User",
	                                   user: req.user.username,
	                                   id: req.user._id,
	                                   messages: req.flash('info')})	
}

exports.deleteUser = (req, res) => {
	User.deleteOne({_id: req.params.id}, (err) => {
		if(err){
			req.flash('info', 'Could not delete user Successfully')
			res.redirect('/delete-user')
		} else {
			Profile.deleteMany({user: req.user}, (err) => {
				if(err){
					res.redirect('/delete-user')
				} else {
					Post.deleteMany({user: req.user}, (err) => {
						if(err){
							res.redirect('/delete-user')
						} else {
							req.flash('info', 'User deleted Successfully')
							res.redirect('/register')
						}
					})
				}
			})
		}
	})
}