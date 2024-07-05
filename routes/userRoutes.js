const express = require('express')
const router = express.Router()

const productRoute = require('./products')

router.use('/user', productRoute)

module.exports = router