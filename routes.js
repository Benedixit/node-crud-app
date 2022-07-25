const express = require('express')

const router = express.Router()

const path = require ('path')

const ProfileController = require('./Controllers/ProfileController')

const UserController = require('./Controllers/UserController')

const PostController = require('./Controllers/PostController')

const Authenticate = require('./Controllers/Authentication')

const passport = require('passport')

const multer = require('multer')



const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/uploads')
	},
	filename: (req, file, cb) => {
		cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
	}

})

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 5000000,
	},
	fileFilter( req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) { 
           return cb(new Error('Please upload a Image'))
         }
       cb(undefined, true)
    }
})

const authenticateParams = { failureRedirect: '/login', 
	                         failureFlash: {type: 'info',
	                                        messages: 'Username or Password Incorrect'}
	                                    }

const authenticated = passport.authenticate('local', authenticateParams)
	                 


router.get('/register', UserController.getSignUp);

router.post('/register', UserController.signup)

router.get('/login', UserController.getLogIn)

router.post('/login', authenticated, UserController.login)

router.get ('/logout', UserController.getLogOut)

router.get ('/', Authenticate.userAuthenticated, UserController.getHome)

router.get('/delete-user/:user/:id', Authenticate.userAuthenticated, UserController.deleteUser)

router.get('/delete-user', Authenticate.userAuthenticated, UserController.getDeletePage)



router.post('/settings', Authenticate.userAuthenticated, upload.single('avatar'), ProfileController.settings)

router.get ('/settings', ProfileController.getSettings)

router.get ('/edit-profile/:id', Authenticate.userAuthenticated, ProfileController.editProfile)

router.post ('/update-bio/:id', Authenticate.userAuthenticated, ProfileController.updateBio)

router.post ('/update-photo/:id', Authenticate.userAuthenticated, upload.single('avatar'), ProfileController.updatePhoto)

router.get('/delete-photo/:id', Authenticate.userAuthenticated, ProfileController.deletePhoto)

router.get('/edit-photo/:id', Authenticate.userAuthenticated, ProfileController.editPhoto)



router.get('/add-posts', Authenticate.userAuthenticated, PostController.addPost)

router.post('/posts', Authenticate.userAuthenticated, upload.single('image'), PostController.posts)

router.get('/post/delete/:id', Authenticate.userAuthenticated, PostController.deletePost)

router.get('/post/:user/:id', Authenticate.userAuthenticated, PostController.viewPost)







module.exports = router