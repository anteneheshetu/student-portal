import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function StudentProfile() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/students/${id}/results`)
      .then(res => res.json())
      .then(results => {
        setStudent({ id, results });
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch student results:', err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Link to="/students" style={{ marginBottom: '20px', display: 'inline-block', color: '#007acc' }}>← Back to Students</Link>

      <h2 style={{ fontSize: '24px' }}>📄 Student Profile</h2>
      <p><strong>ID:</strong> {id}</p>

      {loading ? (
        <p>Loading results...</p>
      ) : student.results.length === 0 ? (
        <p>No results found for this student.</p>
      ) : (
        <table style={{
          width: '100%',
          marginTop: '20px',
          borderCollapse: 'collapse',
          backgroundColor: 'white',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <thead style={{ backgroundColor: '#007acc', color: 'white' }}>
            <tr>
              <th style={thStyle}>Subject</th>
              <th style={thStyle}>Grade</th>
              <th style={thStyle}>Date</th>
            </tr>
          </thead>
          <tbody>
            {student.results.map((r, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <td style={tdStyle}>{r.subject}</td>
                <td style={{ ...tdStyle, fontWeight: 'bold', color: '#007acc' }}>{r.score}</td>
                <td style={tdStyle}>{r.date}</td>
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
