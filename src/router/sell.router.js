const express = require('express')
const sellController = require('../controllers/sell.controller')
const middleware = require('../middleware/middleware')

const sellRouter = express.Router();

sellRouter.get("/sell", middleware.authenticate, sellController.get)
sellRouter.post("/sell", middleware.authenticate, sellController.post)
sellRouter.put("/sell/:id", middleware.authenticate,sellController.put)
sellRouter.delete("/sell/:id", middleware.authenticate, sellController.delete)
module.exports = sellRouter;