const express = require('express');
const router = express.Router();
const User = require('../user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config'); // Import JWT secret

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
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT on successful login
    const payload = { userId: user._id }; // Include relevant user information
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' }); // Set expiration time

    res.json({ message: 'Login successful!', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router;


1:Explanation:
The /signup route handles user signup as before.
The /login route finds the user by email, compares passwords, and generates a JWT on successful login. The JWT contains user ID (or other relevant claims) and is signed with the secret key.
