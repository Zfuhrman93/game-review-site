require('dotenv').config()

const express = require('express');
const router = require('express').Router();
const cors = require('cors');
const app = express();
let Game = require('./models/game.model');

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
const cookieParser = require('cookie-parser');
require('./config/mongoose.config');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('./uploads', express.static('uploads'))

require('./config/mongoose.config');
require('./routes/game.routes')(app);
require('./routes/review.routes')(app);
require('./routes/user.routes')(app);

app.listen(process.env.PORT, console.log(`Listening on port ${process.env.PORT}`));
