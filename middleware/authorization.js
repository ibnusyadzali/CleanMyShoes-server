const { Order } = require("../models");

async function authorization(req, res, next) {
  try {
      let id = req.params.orderId;
      console.log(id)
    let orderData = await Order.findByPk(id);
    if (!orderData) {
      throw { name: `Data not found` };
    } else {
      let userId = req.user.id;
      if (orderData.UserId === userId) {
        next();
      } else {
        throw { name: `Unauthorized` };
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = authorization;
