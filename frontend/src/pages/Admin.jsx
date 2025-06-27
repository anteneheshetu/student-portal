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
  const [activeTab, setActiveTab] = useState('result');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/students`)
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  const handleResultSubmit = async (e) => {
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

  const renderContent = () => {
    switch (activeTab) {
      case 'student':
        return <p>👤 Add Student Form (coming soon)</p>;
      case 'resource':
        return <p>📚 Add Resource Form (coming soon)</p>;
      case 'result':
      default:
        return (
          <form onSubmit={handleResultSubmit}>
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
        );
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={sidePanelStyle}>
        <button onClick={() => setActiveTab('student')} style={sideButtonStyle}>➕ Add Student</button>
        <button onClick={() => setActiveTab('resource')} style={sideButtonStyle}>📚 Add Resource</button>
        <button onClick={() => setActiveTab('result')} style={sideButtonStyle}>📝 Add Result</button>
      </div>
      <div style={{ flex: 1 }}>
        <ResponsiveLayout>
          <h2>🧑‍🏫 Admin Panel</h2>
          {renderContent()}
          {message && <p>{message}</p>}
        </ResponsiveLayout>
      </div>
    </div>
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

const sidePanelStyle = {
  width: '200px',
  backgroundColor: '#f0f0f0',
  padding: '20px',
  borderRight: '1px solid #ddd'
};

const sideButtonStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  backgroundColor: '#e0e0e0',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  textAlign: 'left'
};
