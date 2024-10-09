const express = require('express')
const userController = require('../controllers/user.controller')

const userRouter = express.Router();

userRouter.get("/users", userController.get)
userRouter.post("/registers", userController.post)
userRouter.put("/users/:id", userController.put)
userRouter.delete("/user/:id", userController.delete)
userRouter.post('/login', userController.login)
module.exports = userRouter