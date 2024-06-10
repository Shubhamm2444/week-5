import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API calls

const TodoScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error(error);
        // Handle error gracefully, e.g., display an error message
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask) return; // Prevent empty tasks

    try {
      const response = await axios.post('/api/tasks', { title: newTask });
      setTasks([...tasks, response.data]); // Add new task to local state
      setNewTask('');
    } catch (error) {
      console.error(error);
      // Handle error gracefully, e.g., display an error message
    }
  };

  // ... JSX for rendering tasks and input form

  return (
    <div>
      <h1>Todo List</h1>
      {/* Render existing tasks */}
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default TodoScreen;
