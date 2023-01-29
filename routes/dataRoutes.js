const express = require('express')
const jwt = require('jsonwebtoken')
const { check } = require('express-validator')
const { isAuthenticated } = require('../middleware')
const { allData, data_based_on_time, data_based_on_quarter } = require('../controller/dataController')
const router = express.Router()

router.post('/time',  data_based_on_time)

router.post('/quarter',  data_based_on_quarter)

router.get('/allData', isAuthenticated, allData)



module.exports = router;