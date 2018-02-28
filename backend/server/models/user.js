const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  // facebook: {
  //   id: { type: String },
  //   token: { type: String },
  //   email: { type: String },
  //   name: { type: String }
  // }
});
module.exports = mongoose.model('User', UserSchema);

