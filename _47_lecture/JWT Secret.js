Create a separate file (e.g., config.js) to store your JWT secret key securely. This key should be strong and unique:

module.exports = {
  jwtSecret: 'your_very_strong_and_secret_key'
};
