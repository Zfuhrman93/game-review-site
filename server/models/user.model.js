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
    lowercase: true,
    trim: true,
    validate: {
      validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid E-Mail"
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  admin: {
    type: Boolean,
    default: false
  }
})


UserSchema.virtual("confirmPassword")
  .get(function () { return this._confirmPassword; })
  .set(function (value) { this._confirmPassword = value; });

// Only check/hash when the password itself changed, so re-saving an existing
// user (e.g. to change a name or admin flag) doesn't fail validation or
// hash the already-hashed password.
UserSchema.pre("validate", function () {
  if(this.isModified("password") && this.password !== this.confirmPassword){
    this.invalidate("confirmPassword", "Passwords must match");
  }
});

UserSchema.pre("save", async function () {
  if(!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
})


module.exports = mongoose.model("User", UserSchema);