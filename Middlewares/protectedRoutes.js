const jwt = require('jsonwebtoken');
require('dotenv').config();

const protectAdmin = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY,);
        req.admin = decoded; 
        next(); 
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = protectAdmin;
