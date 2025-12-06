const express = require('express');
const { getResponse } = require('../controllers/responseController');
const responseRouter = express.Router();

responseRouter.post('/', getResponse);

module.exports = responseRouter;
