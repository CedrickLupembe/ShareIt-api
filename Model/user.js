const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
    min: 6,
  },
  lastname: {
    type: String,
    require: true,
    min: 6,
  },
  email: {
    type: String,
    require: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    require: true,
    max: 1024,
    min: 6,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
