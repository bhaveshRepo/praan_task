const express = require('express')
const jwt = require('jsonwebtoken')
const { check } = require('express-validator')
const { isAuthenticated } = require('../middleware')
const { dataParameter, allData } = require('../controller/dataController')
const router = express.Router()

router.get('/particle/:particle', isAuthenticated, dataParameter);

router.get('/allData', isAuthenticated , allData)



module.exports = router;