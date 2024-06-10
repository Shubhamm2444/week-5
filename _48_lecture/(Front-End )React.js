import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming axios for API calls

const MyComponent = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    setToken(storedToken);
  }, []);

  const handleAPICall = async () => {
    if (!token || isTokenExpired(token)) {
      // Token expired, handle it
      console.error('Token expired, please login again');
      localStorage.removeItem('jwtToken');
      // Optionally, redirect to login page
      return;
    }

    try {
      const response = await axios.get('/api/protected-resource', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Helper function to check token expiration (replace with actual logic)
  const isTokenExpired = (token) => {
    // Implement logic to decode and check token expiration time
    // This is a placeholder, replace with actual implementation
    return false; // Replace with actual expiration check
  };

  return (
    <div>
      <button onClick={handleAPICall}>Call Protected API</button>
    </div>
  );
};

export default MyComponent;
