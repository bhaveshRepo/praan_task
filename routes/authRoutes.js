const express = require('express')
const jwt = require('jsonwebtoken')
const { check } = require('express-validator')
const { signIn, signUp } = require('../controller/authController')
const router = express.Router()

router.post('/signin',
    [
        check("email", "Enter correct email").isEmail(),
        check("password", "Minimum 8 character").isLength({ min: 8 }),
    ],
    signIn)

router.post('/signup',
    [
        check("username", "Enter username"),
        check("email", "Enter correct email").isEmail(),
        check("password", "Minimum 8 character").isLength({ min: 8 }),
    ],
    signUp)



module.exports = router;