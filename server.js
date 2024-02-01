const express = require('express');
const session = require('express-session')
const userRouter= require('./routers/userRouter');
const { isLoggedIn } = require('./middlewre.js/session');
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth2").Strategy

require('./config/config')

const app = express()

app.use(express.json())

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 
    }
}))
//initialize passport
app.use(passport.initialize())
//integrate passport with our session auth
app.use(passport.session())


passport.use(new GoogleStrategy({
    clientID: process.env.client_id,
    clientSecret: process.env.client_secret,
    callbackURL: process.env.redirect_url,
    // passReqToCallback   : true
  },
  (request, accessToken, refreshToken, profile, done) =>{
      return done(err, profile);
  }
));

passport.serializeUser((user, done)=> {
    return done(null, user)
})
passport.deserializeUser((user, done)=> {
    return done(null, user)
})

app.use(userRouter)
app.use('/home', isLoggedIn, (req, res)=> {
    res.send(`Hi ${req.session.user.fullName} Welcome to my App, make yourself comfortable`)
})


const PORT = process.env.PORT


app.listen(PORT, ()=>{
    console.log(`This server is listening on port: ${PORT}`)
})