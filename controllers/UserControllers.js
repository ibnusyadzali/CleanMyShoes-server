const {User, Service, Order} = require('../models/index')
const {comparePassword} = require('../helpers/bcrypt')
const {createToken} = require('../helpers/jwt')
const { OAuth2Client } = require("google-auth-library");

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

      static async googleLogin(req, res, next) {
        try {
          const gToken = req.headers.googletoken;
          const client = new OAuth2Client(process.env.clientId);
          const ticket = await client.verifyIdToken({
            idToken: gToken,
            audience: process.env.clientId,
          });
    
          const payload = ticket.getPayload();
    
          const { email, name } = payload;
          const [user, create] = await User.findOrCreate({
            where: { email },
            defaults: {
              username: name,
              email: email,
              password: process.env.googlePass,
              role: "customer",
              address: "defaultByGoogle",
              phoneNumber: "defaultByGoogle",
            },
            hooks: false,
          });
          let access_token = createToken({ id: user.id });
          res.status(200).json({ access_token, username: user.username, email: user.email, role: user.role });
        } catch (error) {
          next(error);
        }
      }
}

module.exports = UserControllers