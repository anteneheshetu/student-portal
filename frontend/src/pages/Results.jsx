import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


  


export default function Results() {


const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isLoggedIn') === 'true';
    if (!isAdmin) {
      navigate('/login');
    }
  }, []);


  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch (`${process.env.REACT_APP_API_URL}/results`)
      .then((res) => res.json())
      .then(setResults)
      .catch((err) => console.error('Error:', err));
  }, []);

  const filtered = results.filter((r) =>
    r.studentId.toLowerCase().includes(search.toLowerCase()) ||
    r.subject.toLowerCase().includes(search.toLowerCase()) ||
    r.score.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>📊 Student Grades</h2>

      <input
        type="text"
        placeholder="Search by student ID, subject, or grade"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '10px',
          marginBottom: '20px',
          width: '100%',
          maxWidth: '400px',
          borderRadius: '6px',
          border: '1px solid #ccc'
        }}
      />

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <thead style={{ backgroundColor: '#007acc', color: 'white' }}>
          <tr>
            <th style={thStyle}>Student ID</th>
            <th style={thStyle}>Subject</th>
            <th style={thStyle}>Grade</th>
            <th style={thStyle}>Date</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
              <td style={tdStyle}>{r.studentId}</td>
              <td style={tdStyle}>{r.subject}</td>
              <td style={{ ...tdStyle, fontWeight: 'bold', color: '#007acc' }}>{r.score}</td>
              <td style={tdStyle}>{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
