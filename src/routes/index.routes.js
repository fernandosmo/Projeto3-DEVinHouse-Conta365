const express = require("express");
const routes = express.Router();
const financeRoute = require("./v1/financeroute");
const userRoute = require("./v1/userroute");

routes.use([userRoute, financeRoute]);

module.exports = routes;
