import React, { useState } from 'react';
import './login.css'; // Include your updated CSS

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle login request
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save JWT token
        localStorage.setItem('token', data.token); 

        // Introduce a 2-second delay before redirecting
        setTimeout(() => {
          window.location.href = '/company_search'; // Redirect to company search page
        }, 2000); // 2 seconds delay
      } else {
        setError('Invalid username or password');
        // Clear input fields for retry
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      setError('An error occurred during login');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit">Login</button>
        {error && <button type="button" onClick={() => { setUsername(''); setPassword(''); setError(''); }}>Retry</button>}
      </form>
    </div>
  );
};

export default Login;
