const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connection to the database was established."))
  .catch(err => console.log("Connection to the database has failed", err))