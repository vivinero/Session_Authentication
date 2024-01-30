const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.home = async(req, res) => {
    res.send()
}

exports.signUp = async (req, res) =>{
    try{
        const {
            fullName,
            email,
            password,
            confirmPassword
        } = req.body;

        const userExist = await userModel.findOne({email})

        if(userExist){
            return res.status(400).json({
                message: 'User already exists'
            })
        }
        if(confirmPassword !== password){
            res.status(400).json({
                message: `Password does not match.`
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const user = await userModel.create({
            fullName,
            email,
            password: hash,
        })

        res.status(201).json({
            message: `Welcome onboard, ${user.fullName}. You have created an account successfully`,
            data: user
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}


exports.logIn = async (req, res) =>{
    try{
        const {
            email,
            password
        } = req.body
        const checkEmail = await userModel.findOne({email})

        if(!checkEmail){
            return res.status(403).json({
                message: `User with email: '${email}' does not exist`
            })
        }

        const pass = bcrypt.compareSync(password, checkEmail.password)

        if(!pass){
            return res.status(400).json({
                message: `You have entered an incorrect password.`
            })
        }

        req.session.user = checkEmail

        res.status(200).json({
            message: `You have logged in successfully.`,
            data: checkEmail
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

exports.getAll = async (req, res) =>{
    try{
        const getAll = await userModel.find()

        if(getAll.length === 0){
            return res.status(400).json({
                message: `There are no users in this database`
            })
        }
        res.status(200).json({
            message: `We have ${getAll.length} user(s) in this database`,
            data: getAll
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

exports.logOut = async (req, res) =>{
    try{
        req.session.destroy()
        res.status(200).json({
            message: 'You have logged out successfully'
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}