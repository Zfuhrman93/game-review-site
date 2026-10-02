require('dotenv').config()

const express = require('express');
const cors = require('cors');
const app = express();

// Hosts like Render/Railway sit behind one reverse proxy; trust it so req.ip
// is the visitor's IP and rate limiting is per user, not shared by everyone.
if(process.env.NODE_ENV === 'production'){
  app.set('trust proxy', 1);
}

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
