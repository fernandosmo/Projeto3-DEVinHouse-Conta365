const express = require('express')
const routes = express.Router()
const financeRoute = require('./v1/financeroute')
const userRoute = require('./v1/userroute')
const userController = require('../controllers/usercontroller')

routes.use('/v1', [userRoute, financeRoute])

routes.get('/users', userController.index)
routes.get('/user/:id', userController.SpecifyUser)

module.exports = routes