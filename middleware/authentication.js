const { User } = require("../models")
const { decodeToken } = require("../helpers/jwt")

async function authentication(req,res,next) {
    try {
        let token = req.headers.access_token
        if(!token) {
            throw {name: `Invalid token`}
        }
        let payload = decodeToken(token)
        let user= await User.findByPk(payload.id)
        if (user) {
            req.user = {id: user.id}
            next()
        } else {
            throw {name: `Unauthenticated`}
        }
    } catch (error) {
        next(error)
    }
}

module.exports= authentication