Import the verifyJWT middleware and use it as a second parameter in your route handlers to protect them:

const express = require('express');
const verifyJWT = require('./middleware/verifyJWT'); // Import middleware

const router = express.Router();

router.get('/protected-route', verifyJWT, (req, res) => {
  // Access user information from req.user (e.g., req.user.userId)
  res.json({ message: 'Welcome, authorized user!' });
});

module.exports = router;


2:Explanation:
The /protected-route route requires successful JWT verification (verifyJWT) before continuing.
Inside the route handler, you can access the decoded user information from req.user.

  3:Important Notes:
Remember to replace 'your_very_strong_and_secret_key' with your actual secret key.
You can extend this middleware to handle different user roles and authorization levels based on claims in the JWT payload.
Consider implementing refresh tokens to avoid frequent login prompts for the user.
