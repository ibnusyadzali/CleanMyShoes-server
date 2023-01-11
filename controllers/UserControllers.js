const {User, Service, Order} = require('../models/index')
const {comparePassword} = require('../helpers/bcrypt')
const {createToken} = require('../helpers/jwt')

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
      static async login(req, res, next) {
        try {
          let { email, password } = req.body;
    
          if (!email || !password) {
            throw { name: `Email or Password is required` };
          }
          let user = await User.findOne({ where: { email } });
          if (!user) {
            throw { name: `Data Not Found` };
          }
    
          let compared = comparePassword(password, user.password);
          if (!compared) {
            throw { name: `Invalid Email/Password` };
          }
    
          let payload = {
            id: user.id,
          };
    
          let access_token = createToken(payload);
          res.status(200).json({ access_token, username: user.username, email: user.email, role: user.role });
        } catch (error) {
          next(error);
        }
      }
}

module.exports = UserControllers