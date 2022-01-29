const express = require('express')
const routes = express.Router()
const financeRoute = require('./v1/financeroute')
const userRoute = require('./v1/userroute')

routes.use('/v1', [userRoute, financeRoute])

module.exports = routes