const express = require('express')
const financeRoute = require('./v1/financeroute')
const userRoute = require('./v1/userroute')
const routes = express.Router()

routes.use('/v1', [userRoute, financeRoute])

module.exports = routes