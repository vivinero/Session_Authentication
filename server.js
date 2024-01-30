const express = require('express');
const session = require('express-session')
const userRouter= require('./routers/userRouter');
const { isLoggedIn } = require('./middlewre.js/session');

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

app.use('/api/v1', userRouter)
app.use('/home', isLoggedIn, (req, res)=> {
    res.send(`Hi ${req.session.user.fullName} Welcome to my App, make yourself comfortable`)
})


const PORT = process.env.PORT


app.listen(PORT, ()=>{
    console.log(`This server is listening on port: ${PORT}`)
})