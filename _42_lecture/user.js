const mongoose = require('mongoose');

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
    required: true,
    // Consider using a password hashing library for security
  },
  // Add other user fields as needed (e.g., firstName, lastName)
});

module.exports = mongoose.model('User', UserSchema);


// This file defines the user schema using Mongoose, specifying the user's properties like username, email, password, and potentially other relevant information. Consider using a password hashing library for robust password storage.
