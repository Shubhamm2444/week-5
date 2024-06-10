const express = require('express');
const router = express.Router();
const User = require('../user'); // Import User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import for JWT

// Environment variable for JWT secret (replace with actual secret)
const jwtSecret = process.env.JWT_SECRET || 'your_secret_key';

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {


    * auth.js:
Defines API routes for signup and login using Express:
/signup: Handles user signup requests.
Checks for existing user with the provided email.
Creates a new User object with the provided credentials (hashed password).
Saves the new user to the database.
Returns a success message on successful signup.

//login: Handles user login requests.
Finds the user by their email address.
Compares the provided password with the hashed password stored in the database using bcrypt.
If passwords match, generates a JWT (optional, for authentication in subsequent requests).
Returns a success message and potentially the JWT on successful login. Otherwise, sends an error message.
