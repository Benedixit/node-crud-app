const User = require('../models/User')
const Post = require('../models/Post')



exports.addPost = (req, res) => {
	res.render('add-posts', {title: "Add New Post",
		                     messages: req.flash('info')})	
}

exports.viewPost = (req, res) => {
	Post.findById({_id: req.params.id}, (err, doc) => {
		if(err){
			req.flash('info', 'Could Not Display Image')
			res.redirect('/')
		} else {
			res.render('post', {title: `${req.user.username} images`,
				                 id: doc.id, 
					             image: doc.image,
					             caption: doc.caption,
					             messages: req.flash('info')})
		}
	})
}


exports.posts = (req, res) => {

	const posts = new Post({
		caption: req.body.caption,
		image: `uploads/${req.file.filename}`,
		user: req.user
	})

	posts.save((err) => {
		if(err){
			req.flash('info', 'Could Not Save Post Successfully')
			res.redirect('/add-posts')
		} else{
			req.flash('info', 'Saved Post Sucessfully')
			res.redirect('/')
		}
	})
	
}


exports.deletePost = (req, res) => {
	 Post.deleteOne({_id: req.params.id}, (err) => {
		if(err){
			req.flash('info', 'Unable to delete this post')
			res.redirect(`post/${req.user.username}/${req.user._id}`)
		} else {
			req.flash('info', 'This post was successfully deleted')
			res.redirect('/')
		}
	})
}

