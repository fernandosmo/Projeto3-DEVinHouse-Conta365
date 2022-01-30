const express = require("express");
const userRoute = express.Router();
const userController = require("../../controllers/usercontroller");

userRoute.get("/users", userController.index);
userRoute.get("/user/:id", userController.specifyUser);
userRoute.post("/newuser", userController.createUser);
userRoute.patch("/user/:id", userController.updateUser);

module.exports = userRoute;
