import React, { useState } from 'react';
import axios from 'axios';

function Signup({ onNavigate }) {
  const [formData, setFormData] = useState({
    first: '',
    last: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    acceptedTerms: false,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.acceptedTerms) {
      try {
        const response = await axios.post('http://localhost:5000/api/users/signup', {
          firstName: formData.first,  // Change 'first' to 'firstName'
          lastName: formData.last,    // Change 'last' to 'lastName'
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
        });
        alert('Signup Successful!');
        onNavigate(); // Navigate to the next page after successful signup
      } catch (err) {
        setError(err.response?.data?.error || 'An error occurred during signup.');
        console.error('Error occurred:', err);
      }
    } else {
      alert('You must accept the terms and conditions to proceed.');
    }
  };
  

  return (
    <div className="form-container">
      <h2>Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first"
          placeholder="First Name"
          value={formData.first}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last"
          placeholder="Last Name"
          value={formData.last}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <label>
          <input
            type="checkbox"
            name="acceptedTerms"
            checked={formData.acceptedTerms}
            onChange={handleChange}
          />
          I accept the terms and conditions.
        </label>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
