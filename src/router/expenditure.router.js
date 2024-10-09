const express = require('express')
const sellController = require('../controllers/sell.controller')

const ExpenditureRouter = express.Router();

ExpenditureRouter.get("/expenditure", sellController.get)
ExpenditureRouter.post("/expenditure", sellController.post)
ExpenditureRouter.put("/expenditure/:id", sellController.put)
ExpenditureRouter.delete("/expenditure/:id", sellController.delete)
module.exports = ExpenditureRouter;