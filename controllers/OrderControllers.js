const { User, Service, Order } = require("../models/index");

class OrderControllers {
  static async createOrder(req, res, next) {
    try {
      const UserId = req.user.id;
      let { shoesBrand, shoesSize, shoesColor, shoesMaterial, phoneNumberPIC, photo, pickUpAddress, ServiceId } = req.body;

      const orderIdNumber = `#${UserId}${ServiceId}${Math.floor(Math.random() * 100)}`;

      const noPicture = "../assets/Sorry... there's no image yet (.png";

      if (!photo) {
        photo = noPicture;
      }
      let photoAfter = noPicture;
      const data = await Order.create({ orderIdNumber, shoesBrand, shoesSize, shoesColor, shoesMaterial, phoneNumberPIC, photo, pickUpAddress, photoAfter, status: "On Request", ServiceId, UserId });

      res.status(201).json({ message: `Success create order with Order ID Number ${data.orderIdNumber}` });
    } catch (error) {
      next(error);
    }
  }

  static async fetchAllOrders(req, res, next) {
    try {
      const allData = await Order.findAll({ include: [User, Service], order: [["id", "DESC"]] });
      res.status(200).json(allData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async fetchMyOrder(req, res, next) {
    try {
      const userId = req.user.id;
      const myOrder = await Order.findAll({ where: { UserId: userId }, include: [User, Service], order: [["id", "DESC"]] });
      res.status(200).json(myOrder);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async fetchOrderDetail(req, res, next) {
    try {
      const orderId = req.params.orderId;
      const data = await Order.findOne({ where: { id: orderId }, include: [User, Service] });
      if (!data) {
        throw { name: "Data not found" };
      }
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateOrderData(req, res, next) {
    try {
      const orderId = req.params.orderId;
      let { status, photoAfter } = req.body;

      if(!photoAfter) {
        photoAfter = "../assets/Sorry... there's no image yet (.png"
      }

      const findData = await Order.findOne({ where: { id: orderId } });
      if (!findData) {
        throw { name: "Data not found" };
      }

      const serviceData = await Service.findOne({ where: { id: findData.ServiceId } });

      let day = +serviceData.estimatedDay;

      if (status === "Pick Up Process") {
        await Order.update({ status, photoAfter }, { where: { id: orderId } });
      } else if (status === "Cleaning On Process") {
        let date = new Date();
        let estimatedDate = date.setDate(date.getDate() + day);

        await Order.update({ status, photoAfter,estimatedDate }, { where: { id: orderId } });
      } else if (status === "Completed") {
        let completedDate = new Date();
        await Order.update({ status, completedDate, photoAfter }, { where: { id: orderId } });
      }
      res.status(201).json({ message: "Success update order data" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = OrderControllers;
