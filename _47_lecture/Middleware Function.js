1: Create a middleware function to verify the JWT and extract user information:

const jwt = require('jsonwebtoken');
const config = require('./config'); // Import JWT secret

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if authorization header is present and formatted correctly
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1]; // Extract token from header

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // Attach decoded user information to the request object
    next(); // Allow the request to proceed
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = verifyJWT;


2:Explanation:
The middleware checks for the presence and format of the Authorization header (should start with Bearer).
It extracts the token from the header.
It verifies the token using jwt.verify and the secret key.
If verification is successful, the decoded user information (e.g., user ID, roles) is attached to the request object (req.user) for access in route handlers.
On errors (e.g., missing token, invalid token, expired token), an unauthorized response is sent (401 status code).
