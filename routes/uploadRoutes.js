const express = require('express')
const jwt = require('jsonwebtoken')
const { check } = require('express-validator')
const { uploads} = require('../controller/uploadController')
const router = express.Router()

router.post('/upload', uploads)


module.exports = router;