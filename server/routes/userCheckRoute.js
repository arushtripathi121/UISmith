const express = require('express');
const { verifyAuth } = require('../middlewares/authCheck');
const verifyAuthRouter = express.Router();

verifyAuthRouter.get('/', verifyAuth, (req, res) => {

    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'no user found',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'access granted',
            user: {
                user_name: req.user.name,
                user_email: req.user.email,
                userProfileURL: req.user.profilePhotoUrl,
            }
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

module.exports = verifyAuthRouter;