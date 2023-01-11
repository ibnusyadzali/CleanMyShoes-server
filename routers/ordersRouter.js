const express = require('express')
const OrderControllers = require("../controllers/OrderControllers")
const authentication = require('../middleware/authentication')
const router = express.Router()

router.post('/', authentication,OrderControllers.createOrder)
// router.get('/', authentication,OrderControllers.readMyOrder)
// router.get('/:id', authentication, authorization,OrderControllers.readMyOrderDetail)
// router.put('/:id', authentication, authorization,OrderControllers.updateOrderStatus)

module.exports = router