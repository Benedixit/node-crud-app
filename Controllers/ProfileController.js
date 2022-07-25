const User = require('../models/User')
const Profile = require('../models/Profile')
const Post = require('../models/Post')



exports.getSettings = async (req, res) => {
	const profile = await Profile.findOne({user: req.user})
	if(req.user){
		if (profile !== null){
			res.redirect('/')
		} else {
			res.render('settings', {title: "My Images", 
					                 user: req.user, 
					                 messages: req.flash('info')})
		}
	} else {
		req.flash('info', 'Please Log in to change your settings')
		res.redirect('/')
	}
		
}


exports.settings = (req, res, next)=>{
	const profile = new Profile ({
		bio: req.body.bio,
		avatar: `uploads/${req.file.filename}`,
		user: req.user
	})


	profile.save((err)=>{

		if(err){
			req.flash('info', 'Your settings were not saved successfully')
			res.redirect('/settings')

		} else {
			req.flash('info', 'Settings Updated Succesfully')
			res.redirect('/')

		}
	})
}

exports.editProfile = (req, res, next) => {
	Profile.findById({_id: req.params.id}, (err, doc) => {
		if(err){
			req.flash('info', 'You could not access your profile settings. Check Again')
			res.redirect('/')
		} else {
			res.render('edit-profile', {title: 'Edit Bio',
				                        id: doc.id, 
				                        bio: doc.bio,
				                        })
		}
	})
	
}

exports.editPhoto = (req, res, next) => {
	Profile.findById({_id: req.params.id}, (err, doc) => {
		if(err){
			req.flash('info', 'You could not access your profile settings. Check Again')
			res.redirect('/')
		} else {
			res.render('edit-photo', {title: 'Edit Photo',
				                        id: doc.id,
				                        })
		}
	})
	
}

exports.updateBio = (req, res) => {
	Profile.findByIdAndUpdate({_id: req.params.id}, {bio: req.body.bio}, (err, doc) => {
		if(err){
			req.flash('info', 'Your bio failed to update')
			res.redirect('/edit-profile')
		} else {
			req.flash('info', 'Bio Successfully Updated')
			res.redirect('/')
		}
	})
}


exports.updatePhoto = (req, res) => {
	Profile.findByIdAndUpdate({_id: req.params.id}, {avatar: `uploads/${req.file.filename}`}, (err, doc) => {
		if(err){
			req.flash('info', 'Your photo failed to update')
			res.redirect('/edit-profile')
		} else {
			req.flash('info', 'Your photo was updated')
			res.redirect('/')
		}
	})
}


exports.deletePhoto = (req, res) => {
	 Profile.findByIdAndUpdate({_id: req.params.id}, {avatar: ""}, (err) => {
		if(err){
			req.flash('info', 'Your photo failed to delete')
			res.redirect('/edit-profile')
		} else {
			req.flash('info', 'Your photo has been successfully removed')
			res.redirect('/')
		}
	})
}