const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import for password hashing

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Hash password before saving a new user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);


* user.js:
Defines the User schema with Mongoose, specifying required fields.
Implements a pre('save') hook using bcrypt to hash the user's password before saving it to the database. This is crucial for security.
