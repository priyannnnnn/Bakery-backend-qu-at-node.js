const express = require('express');
const userRouter = require('./router/user.router');
const sellRouter = require('./router/sell.router')

const app = express();
app.use(express.json());

app.use('/api', userRouter);
app.use('/api', sellRouter)


// app.use(userController)
app.listen(8000, ()=> {
    console.log("App listen ")
})