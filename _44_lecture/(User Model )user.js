const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

1: Explanation:
The UserSchema defines the user model with properties like username, email, and password.
The pre('save') hook ensures the password is hashed before saving.
bcrypt.genSalt(10) generates a random salt for secure hashing.
bcrypt.hash(this.password, salt) hashes the user's password using the generated salt.
