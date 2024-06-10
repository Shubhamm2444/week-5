const express = require('express');
const app = express();
const authRoutes = require('./auth');
const cors = require('cors'); // Add CORS middleware (optional)

// Connect to database (
