const {User, Service, Order} = require('../models/index')

class OrderControllers {
    static async createOrder(req,res,next) {
        try {
            const UserId = req.user.id
            let {shoesBrand, shoesSize, shoesColor, shoesMaterial, phoneNumberPIC, photo, pickUpAddress, ServiceId} = req.body
            
            const orderIdNumber = `#${UserId}${ServiceId}${Math.floor(Math.random() * 100)}`
        
            const noPicture = "../assets/Sorry... there's no image yet (.png"

            if (!photo) {
                photo = noPicture
            }
            let photoAfter = noPicture
            const data = await Order.create({orderIdNumber, shoesBrand, shoesSize, shoesColor, shoesMaterial, phoneNumberPIC, photo, pickUpAddress, photoAfter, status: 'On Request ', ServiceId, UserId})
            
            res.status(201).json({ message: `Success create order with Order ID Number ${data.orderIdNumber}`})
        } catch (error) {
            next(error)
        }
    }

    static async fetchAllOrders(req, res,next) {
        try {
            const allData = await Order.findAll({include: [User,Service], order: [["id", "DESC"]]})
            res.status(200).json(allData)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async fetchOrderDetail(req, res, next) {
        try {
            const orderId = req.params.orderId
            const data = await Order.findOne({where: {id : orderId}, include: [User, Service]})
            if (!data) {
                throw {name: 'Data not found'}
            }
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = OrderControllers