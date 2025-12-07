const express = require('express');
const cors = require('cors');
const connectToDB  = require('./config/mongooseConnection');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes');
const verifyAuthRouter = require('./routes/userCheckRoute');
const responseRouter = require('./routes/responseRoutes');
const sessionRouter = require('./routes/sessionController');

const app = express();
app.use(express.json());

const corsOptions = {
    origin: process.env.FURL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}

app.use(cors(corsOptions));
app.use(cookieParser());

connectToDB();

app.get('/api/v1/test', (req, res) => {
    res.send('The server is working fine');
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/authVerify', verifyAuthRouter);
app.use('/api/v1/response', responseRouter);
app.use('/api/v1/sessions', sessionRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`The app is running on port:${port}`);
})