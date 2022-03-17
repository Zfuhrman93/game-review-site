require('dotenv').config()

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./config/mongoose.config');
require('./routes/game.routes')(app);
require('./routes/review.routes')(app);


app.listen(process.env.PORT, console.log(`Listening on port ${process.env.PORT}`));