const bcrypt = require('bcrypt');

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

    // Login successful (implement token generation or other logic)
    res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

1:Explanation:
The /login route handles user login requests.
It finds the user by email and compares the provided password with the hashed password stored in the database using bcrypt.compare().
If the passwords match, a success message is sent (you can further implement token generation for subsequent requests).
