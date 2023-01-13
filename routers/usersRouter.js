const UserControllers = require("../controllers/UserControllers")
const express = require('express')
const router = express.Router()


router.post('/register', UserControllers.register)
router.post('/login', UserControllers.login)
router.post('/login/google', UserControllers.googleLogin)

module.exports = router