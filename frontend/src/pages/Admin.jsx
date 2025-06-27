// Admin.jsx
import React, { useEffect, useState } from 'react';
import ResponsiveLayout from './ResponsiveLayout';

export default function Admin() {
  const [students, setStudents] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/students`)
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId || !subject || !score || !date) {
      setMessage('Please fill all fields');
      return;
    }

    const result = { subject, score, date };

    const res = await fetch(`${process.env.REACT_APP_API_URL}/students/${selectedId}/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    });

    if (res.ok) {
      setMessage('✅ Result added!');
      setSubject('');
      setScore('');
      setDate('');
    } else {
      setMessage('❌ Failed to add result');
    }
  };

  return (
    <ResponsiveLayout>
      <h2>🧑‍🏫 Admin Panel – Add Student Result</h2>
      <form onSubmit={handleSubmit}>
        <select value={selectedId} onChange={e => setSelectedId(e.target.value)} style={inputStyle} required>
          <option value="">Select Student</option>
          {students.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <input type="text" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} style={inputStyle} required />
        <input type="text" placeholder="Score" value={score} onChange={e => setScore(e.target.value)} style={inputStyle} required />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} required />
        <button type="submit" style={buttonStyle}>Add Result</button>
      </form>
      {message && <p>{message}</p>}
    </ResponsiveLayout>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '6px'
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};
