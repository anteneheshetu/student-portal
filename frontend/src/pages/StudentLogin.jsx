import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentLogin() {
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      const res = await fetch (`${process.env.REACT_APP_API_URL}/students/${studentId}/results`);
      if (!res.ok) throw new Error('Student not found');

      localStorage.setItem('studentId', studentId);
      navigate(`/students/${studentId}`);
    } catch {
      setError('❌ Invalid Student ID');
    }
  };

  return (
    <div style={{ padding: '60px', fontFamily: 'Segoe UI', textAlign: 'center' }}>
      <h2>🎓 Student Login</h2>
      <form onSubmit={handleLogin} style={{ maxWidth: '300px', margin: '30px auto' }}>
        <input
          type="text"
          placeholder="Enter your Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
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
