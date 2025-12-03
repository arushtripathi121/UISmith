const { default: axios } = require('axios');
const { oauth2Client } = require('../config/oAuthCongif');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { log } = require('console');

exports.loginUsingOAuth = async (req, res) => {
    try {
        const { code } = req.query;
        
        const googleResponse = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleResponse.tokens);
        const userResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`);

        const { email, name, picture } = userResponse.data;
        console.log(email, name, picture);
        
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ name: name, email: email, profilePhotoUrl: picture });
        }

        const { _id } = user;
        const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.cookie("userCookie", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'lax',
        })

        return res.status(200).json({
            success: true,
            message: 'user created successfully'
        })
    } catch (err) {
        console.log('Error in creating/verifying user ', err.message);
        return res.status(500).json({
            success: true,
            message: 'Error in creating user',
            err
        })
    }
}