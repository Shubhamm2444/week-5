const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect('mongodb://localhost:27017/your_database_name', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);  // Exit process on connection failure
  }
};

module.exports = connectDB;


* app.mongoose.js:

Establishes a connection to your MongoDB database using Mongoose.
