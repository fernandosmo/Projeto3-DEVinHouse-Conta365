const express = require("express");
const financeRoute = express.Router();
const financeController = require("../../controllers/financecontroller")
const multer = require('multer')
const upload = multer()

financeRoute.post("/finance/:userid",upload.single('file'), financeController.getXlsxUploaded);
financeRoute.delete("/:userid/:financeid", financeController.deleteFinance);
financeRoute.get("/finance/:userid", financeController.getFinanceByUser);

module.exports = financeRoute;
