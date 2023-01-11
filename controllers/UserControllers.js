const {User, Service, Order} = require('../models/index')

class UserControllers {

    static async register(req, res, next) {
        try {
          let { username, email, password, phoneNumber, address } = req.body;
          let role = ''
          if (username.slice(0,6) === 'admin.'){
            role = 'admin'
          } else {
            role = 'customer'
          }
          let data = await User.create({ username, email, password, role, phoneNumber, address });
          res.status(201).json({ message: `Thank you ${data.username}, your account has been created` });
        } catch (error) {
          next(error);
        }
      }

}

module.exports = UserControllers