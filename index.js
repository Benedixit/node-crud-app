const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const routes = require('./routes')
const port = process.env.PORT || 8080
const User = require('./models/User')
require('dotenv').config()


app.use(flash());

app.use(session({
  secret: 'Rn3AWfAakN6tpFhNcN',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use(express.static('./public'))

const mongoDB = process.env.MONGO_URL
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(passport.initialize());
app.use(passport.session());

app.use("", routes)
app.set('view engine', 'ejs')


passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

db.once('once', (req, res)=>{
	app.listen(port, ()=>{
		console.log("Loading")
	})
})
