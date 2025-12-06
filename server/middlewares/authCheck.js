const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.user;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "user not logged in",
            })
        }

        let decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'login expired',
            })
        }

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'no user found'
            })
        }

        req.user = user;
        next()
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}