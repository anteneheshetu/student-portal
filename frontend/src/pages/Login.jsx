import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace with real credentials or API later
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/admin');
    } else {
      setError('❌ Invalid credentials');
    }
  };

  return (
    <div style={{ padding: '60px', fontFamily: 'Segoe UI', textAlign: 'center' }}>
      <h2>🔐 Admin Login</h2>
      <form onSubmit={handleLogin} style={{ maxWidth: '300px', margin: '30px auto' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={inputStyle}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        /><br />
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '6px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007acc',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};
