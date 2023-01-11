const express = require('express')
const OrderControllers = require("../controllers/OrderControllers")
const authentication = require('../middleware/authentication')
const {authorization, adminAuthorization} = require('../middleware/authorization')
const router = express.Router()

router.post('/', authentication,OrderControllers.createOrder)
router.get('/', authentication, adminAuthorization,OrderControllers.fetchAllOrders)
router.get('/myOrder', authentication, OrderControllers.fetchMyOrder)
router.get('/:orderId', authentication, authorization,OrderControllers.fetchOrderDetail)
// router.put('/:id', authentication, authorization,OrderControllers.updateOrderStatus)

module.exports = router