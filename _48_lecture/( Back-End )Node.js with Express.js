const express = require('express');
const jwt = require('jsonwebtoken'); // For token verification

const app = express();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized: Missing token');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Replace with actual secret
    req.user = decoded; // Attach decoded user information to request object
    next();
  } catch (error) {
    res.status(403).send('Forbidden: Invalid or expired token');
  }
};

app.get('/api/protected-resource', verifyToken, (req, res) => {
  // Access user data from req.user (if token is valid)
  console.log('Accessing protected resource for user:', req.user.id);
  res.send('You have access to the protected resource!');
});

app.listen(3000, () => console.log('Server listening on port 3000'));


Note: These are simplified examples. You'll need to implement the actual token generation, storage, and refresh logic based on your specific requirements. Remember to replace placeholders like "your_secret_key" with your actual values.
