module.exports = {
	userAuthenticated: (req, res, next) => {
		if(req.isAuthenticated()) {
			return next()
		}
		req.flash('info', 'Please Log In To Access this Page')
		res.redirect('/login')

	},

	forwardAuthenticated: (req, res, next) => {
		if(!req.isAuthenticated()){
			return next()
		}
		req.redirect('/')
	}
}