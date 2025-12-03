const express = require('express');
const { loginUsingOAuth } = require('../controllers/authController');
const authRouter = express.Router();

authRouter.get('/google', loginUsingOAuth);

module.exports = authRouter;