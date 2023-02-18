const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [5, "password should be more than 6 characters"],
  },
});

module.exports = mongoose.model("User", UserSchema);
