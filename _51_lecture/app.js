const express = require('express');
const mongoose = require('mongoose'); // Assuming Mongoose for database interactions

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a simple model for storing tasks (replace with your schema)
const Task = mongoose.model('Task', {
  title: String,
  completed: Boolean,
});

// Route to get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching tasks');
  }
});

// Route to create a new task
app.post('/api/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  try {
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error creating task');
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
