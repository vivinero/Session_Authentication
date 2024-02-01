const express = require('express');
const router = express.Router()

const { signUp, logIn, getAll, logOut, socialAuth } = require('../controllers/userCont');
const { isLoggedIn } = require('../middlewre.js/session');


router.post('/signup', signUp)
router.post('/login', logIn)

// router.get('/sociallogin', (req,res)=> {
//     res.redirect("https://facebook.com")
// })
router.get('/sociallogin', (req,res)=> {
    res.redirect("http://localhost:1220/api/v1/auth/google/callback")
})

router.get('/getall', isLoggedIn ,getAll)
router.post('/logout', logOut)
router.get('/api/v1/auth/google/callback', socialAuth)
router.get('/auth/google/success', (req,res)=> {
    // req.session.user 
})

module.exports = router