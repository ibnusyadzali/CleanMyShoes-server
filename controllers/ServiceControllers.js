const {User, Service, Order} = require('../models/index')

class ServiceControllers {
 static async fetchServices(req, res, next) {
    try {
        const data = await Service.findAll()
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        next(error)
    }
 }
}

module.exports = ServiceControllers