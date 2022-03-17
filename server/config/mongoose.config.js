const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/gamereviews", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connection to the database was established."))
  .catch(err => console.log("Connection to the database has failed", err))