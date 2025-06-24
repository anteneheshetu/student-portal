// Students.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Students() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isLoggedIn') === 'true';
    if (!isAdmin) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/students`)

      .then((res) => res.json())
      .then(setStudents)
      .catch((err) => console.error('Error:', err));
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>👨‍🎓 Students</h2>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: 'white'
        }}>
          <thead style={{ backgroundColor: '#007acc', color: 'white' }}>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s.id} style={{ backgroundColor: i % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                <td style={tdStyle}>{s.id}</td>
                <td style={tdStyle}>
                  <Link to={`/students/${s.id}`} style={linkStyle}>
                    {s.name}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  padding: '12px 16px',
  textAlign: 'left',
  fontWeight: '600'
};

const tdStyle = {
  padding: '12px 16px',
  borderBottom: '1px solid #e0e0e0'
};

const linkStyle = {
  color: '#007acc',
  textDecoration: 'none',
  fontWeight: '500'
};
