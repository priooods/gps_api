const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  poslat: { type: Number },
  poslng: { type: Number },
  tujuan: { type: String }
});

const user = mongoose.model("User", UserSchema);
module.exports.User = user;