const express = require('express');
const router = express.Router()

const { signUp, logIn, getAll, logOut } = require('../controllers/userCont');
const { isLoggedIn } = require('../middlewre.js/session');


router.post('/signup', signUp)
router.post('/login', logIn)
router.get('/getall', isLoggedIn ,getAll)
router.post('/logout', logOut)

module.exports = router