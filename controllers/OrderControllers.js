const {User, Service, Order} = require('../models/index')

class OrderControllers {
    static async createOrder(req,res,next) {
        try {
            const UserId = req.user.id
            const {shoesBrand, shoesSize, shoesColor, shoesMaterial, phoneNumberPIC, photo, pickUpAddress, ServiceId} = req.body
            
            const orderIdNumber = `#${UserId}${ServiceId}${Math.floor(Math.random() * 100)}`

            const data = await Order.create({orderIdNumber, shoesBrand, shoesSize, shoesColor, shoesMaterial, phoneNumberPIC, photo, pickUpAddress, status: 'On Request ', ServiceId, UserId})
            
            res.status(201).json({ message: `Success create order with Order ID Number ${data.orderIdNumber}`})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = OrderControllers