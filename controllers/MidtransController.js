const { User, Service, Order } = require("../models/index");
const midtransClient = require('midtrans-client');

class MidtransController {
  static async midtrans(req, res) {
    console.log("hiiihii");
      try {
        const orderId = req.params.orderId

        const dataOrder = await Order.findOne({ where: { id: orderId }, include: [User, Service] })


      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY
      });

    let parameter = {
        "transaction_details": {
            "order_id": dataOrder.orderIdNumber,
            "gross_amount": dataOrder.Service.price
        },
        "credit_card":{
            "secure" : true
        },
        "customer_details": {
            "first_name": dataOrder.User.username,
            "email": dataOrder.User.email,
            "phone": dataOrder.User.phoneNumber
        }
    };
     
    let transaction = await snap.createTransaction(parameter)
    
    res.status(201).json(transaction)
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MidtransController
