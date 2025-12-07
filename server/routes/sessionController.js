const express = require('express');
const { getSesionsByUser } = require('../controllers/sessionController');
const { verifyAuth } = require('../middlewares/authCheck');

const sessionRouter = express.Router();

sessionRouter.get('/user', verifyAuth ,getSesionsByUser);

module.exports = sessionRouter;