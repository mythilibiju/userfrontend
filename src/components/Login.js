import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        // Send login request to backend
        const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
  
        // Store the token and userId in localStorage
        localStorage.setItem('token', response.data.token); // Store JWT token
        localStorage.setItem('userId', response.data.userId); // Store userId
  
        // Trigger onLogin callback to update state in the parent component
        onLogin();
      } catch (error) {
        // Handle error
        setErrorMessage(error.response?.data?.error || 'Something went wrong');
      }
    } else {
      setErrorMessage('Please fill in both fields.');
    }
  };
  

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Login;
