const express = require('express')
const OrderControllers = require("../controllers/OrderControllers")
const authentication = require('../middleware/authentication')
const {authorization, adminAuthorization} = require('../middleware/authorization')
const router = express.Router()

const multer = require('multer')
const {storage} = require('../cloudinary/index')
const upload = multer ({storage})

router.post('/', upload.single('photoImage'), authentication,OrderControllers.createOrder)
router.get('/', authentication, adminAuthorization,OrderControllers.fetchAllOrders)
router.get('/myOrder', authentication, OrderControllers.fetchMyOrder)
router.get('/:orderId', authentication, authorization,OrderControllers.fetchOrderDetail)
router.patch('/:orderId', upload.single('photoImage'), authentication, adminAuthorization,OrderControllers.updateOrderData)

module.exports = router