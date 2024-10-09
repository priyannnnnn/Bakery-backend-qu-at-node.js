const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';

module.exports = {
    authenticate: (req, res, next) => {
        
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

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