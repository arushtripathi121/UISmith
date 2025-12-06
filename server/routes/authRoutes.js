const express = require('express');
const { loginUsingOAuth, logout } = require('../controllers/authController');
const authRouter = express.Router();

authRouter.get('/google', loginUsingOAuth);
authRouter.get('/logout', logout);

module.exports = authRouter;