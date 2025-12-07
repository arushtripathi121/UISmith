const express = require('express');
const { getResponse } = require('../controllers/responseController');
const { verifyAuth } = require('../middlewares/authCheck');
const responseRouter = express.Router();

responseRouter.post('/', verifyAuth, getResponse);

module.exports = responseRouter;
