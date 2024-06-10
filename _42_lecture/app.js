const express = require('express');
const connectDB = require('./app.mongoose'); // Import database connection
const User = require('./user');  // Import User model

const app = express();

// Connect to database
connectDB();

// Routes (add routes for user creation, login, etc.)
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password  // Hash password before storing (refer to documentation)
    });

    const savedUser = await newUser.save();
    res.json({ message: 'User created successfully!', data: savedUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Add other routes as needed for user management

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));


// This file sets up a basic Express server and imports the database connection and user model. It demonstrates a sample route for user registration, where you'd typically implement password hashing before saving the user object. Add additional routes for login, profile management, and other user-
