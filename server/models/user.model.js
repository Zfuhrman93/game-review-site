const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "User Name is required"]
  },
  email: {
    type: String,
    required: [true, "E-Mail is required"],
    validate: {
      validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid E-Mail"
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  }
})


UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  console.log("Inside Validate");
  if(this.password !== this.confirmPassword){
    this.invalidate("confirmPassword", "Passwords must match");
  }
  next();
});

UserSchema.pre("save", function (next) {
  console.log("Inside Hash");
  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      console.log("HASHING");
      next();
    })
    .catch((err) => {
      console.log('Error!');
      console.log(err);
    })
})


module.exports = mongoose.model("User", UserSchema);