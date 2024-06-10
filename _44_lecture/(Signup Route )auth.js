const express = require('express');
const router = express.Router();
const User = require('../user'); // Import User model

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

module.exports = router;

1: Explanation:
The /signup route handles user signup requests.
It checks for existing users with the provided email.
If the email is unique, a new user object is created with the hashed password.
The user is then saved to the database, and a success message is sent on success.
