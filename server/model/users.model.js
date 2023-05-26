const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  gender: String,
  status: {
    type: Boolean,
    default: false,
  },
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: {
    type: String,
    default: "https://raw.githubusercontent.com/elkhiari/feeds_app_front/main/src/user.png",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Userdb = mongoose.model("userdb", schema);
module.exports = Userdb;
