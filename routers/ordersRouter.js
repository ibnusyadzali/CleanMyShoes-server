const express = require('express')
const OrderControllers = require("../controllers/OrderControllers")
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const router = express.Router()

router.post('/', authentication,OrderControllers.createOrder)
// router.get('/', authentication,OrderControllers.readMyOrder)
router.get('/:orderId', authentication, authorization,OrderControllers.fetchOrderDetail)
// router.put('/:id', authentication, authorization,OrderControllers.updateOrderStatus)

module.exports = router