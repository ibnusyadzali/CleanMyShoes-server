const express = require('express')
const router = express.Router()
const usersRouter = require('./usersRouter')
const ordersRouter = require('./ordersRouter')
const servicesRouter = require('./servicesRouter')

router.use('/users', usersRouter)
router.use('/orders', ordersRouter)
router.use('/services', servicesRouter)

module.exports = router