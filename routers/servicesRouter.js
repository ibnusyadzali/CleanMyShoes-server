const ServiceControllers = require("../controllers/ServiceControllers")
const express = require('express')
const router = express.Router()

router.get('/',ServiceControllers.fetchServices)

module.exports = router