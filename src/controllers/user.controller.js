// const { User } = require("../router/user.router");
// const { where } = require('sequelize');
const { User } = require('../models');  // Make sure the path is correct
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret key for JWT (in production, store in environment variables)
const JWT_SECRET = 'your_secret_key';

module.exports = {
    get: async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            return res.status(500).send({
                errorCode: 500,
                message: error.message,
            });
        }
    },
    post: async(req, res) =>{
        // try {
        //     const users = await User.create(req.body);
        //     res.json(users);
        // } catch (error) {
        //     return res.status(500).send({
        //         errorCode: 500,
        //         message: error.message,
        //     });
        // }
        const { username, password } = req.body;
        try {
            // Hash the password before saving it
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                username,
                password: hashedPassword,
            });
            res.json(user);
        } catch (error) {
            return res.status(500).send({
                errorCode: 500,
                message: error.message,
            });
        }
    },
    put: async(req, res) =>{
        try{
            const user = await User.findByPk(req.params.id)
            if (user) {
                await user.update(req.body)
                res.json(user)
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        }catch{
            return res.status(500).send({
                errorCode: 500,
                message: error.message,
            });
        }
    },
    delete: async(req, res) =>{
        try{
            const user = await User.findByPk(req.params.id)
            if (user) {
                await user.destroy()
                res.json(user)
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        }catch{
            return res.status(500).send({
                errorCode: 500,
                message: error.message,
            });
        }
    },

    login: async(req, res) =>{
        const {username, password} = req.body;
        try{
            const user = await User.findOne({ where : {username}})
            // console.log("username = ", { where : {username}})
            // console.log("users = ", user.dataValues.username)
            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log("password ", isPasswordValid)
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        }catch(error){
            return res.status(500).send({
                errorCode: 500,
                message: error.message,
            });
        }
    },
    authenticate: (req, res, next) => {
        const token = req.headers['authorization'];

        if(!token) {
            return res.status(403).json({message:'No Token Provided'});
        }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if(err) {
                return res.status(500).json({ message: 'Failed to authenticate token' });
            }
            req.userId = decoded.userId;
            next();
        });
    }
    
}
