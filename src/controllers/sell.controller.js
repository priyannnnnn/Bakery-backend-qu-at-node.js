const {Sell} = require('../models')
// const { get, post } = require('./user.controller')

module.exports = {
    get:async(req, res) => {
        try{
            const sell = await Sell.findAll();
            res.json(sell)
        }catch(error){
            return res.status(500).send({
                errorCode: 500,
                message: error.message,
            });
        }
    },
    post:async(req, res) => {
        try{
            const sell = await Sell.create(req.body);
            res.json(sell)
        }catch(error){
            return res.status(500).send({
                errorCode: 500,
                message: error.message,
            });
        }
    },
    put:async(req, res) => {
        try{
            const sell = await Sell.findByPk(req.params.id)
            if(sell){
                await sell.update(req.body)
                res.json(sell)
            }else{
                res.status(404).json({ error: 'User not found' });
            }
        }catch{
            return res.status(500).send({
                errorCode: 500,
                message: error.message,
            });
        }
        
    },
    delete:async(req, res) => {
        try{
            const sell = await Sell.findByPk(req.params.id)
            if(sell){
                await sell.destroy()
                res.json(sell)
            }else{
                res.status(404).json({ error: 'User not found' });
            }
        }catch{
            return res.status(500).send({
                errorCode: 500,
                message: error.message,
            });
        }
    },
}