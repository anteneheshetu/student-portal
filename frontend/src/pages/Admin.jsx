// Admin.jsx
import React, { useEffect, useState } from 'react';
import ResponsiveLayout from './ResponsiveLayout';

export default function Admin() {
  const [students, setStudents] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState('');
  const [date, setDate] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentId, setNewStudentId] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookFile, setBookFile] = useState(null);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('result');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/students`)
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  const handleResultSubmit = async (e) => {
    e.preventDefault();
    const result = { subject, score, date };
    const res = await fetch(`${process.env.REACT_APP_API_URL}/students/${selectedId}/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    });
    if (res.ok) {
      setMessage('✅ Result added!');
      setSubject(''); setScore(''); setDate('');
    } else setMessage('❌ Failed to add result');
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    const student = { id: newStudentId, name: newStudentName, results: [] };
    const res = await fetch(`${process.env.REACT_APP_API_URL}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
    if (res.ok) {
      setMessage('✅ Student added!');
      setNewStudentId('');
      setNewStudentName('');
    } else setMessage('❌ Failed to add student');
  };

  const handleResourceSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', bookTitle);
    formData.append('author', bookAuthor);
    formData.append('file', bookFile);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/books/upload`, {
      method: 'POST',
      body: formData
    });
    if (res.ok) {
      setMessage('✅ Resource uploaded!');
      setBookTitle('');
      setBookAuthor('');
      setBookFile(null);
    } else setMessage('❌ Failed to upload resource');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'student':
        return (
          <form onSubmit={handleStudentSubmit} style={fadeInStyle}>
            <input type="text" placeholder="Student ID" value={newStudentId} onChange={e => setNewStudentId(e.target.value)} style={inputStyle} required />
            <input type="text" placeholder="Full Name" value={newStudentName} onChange={e => setNewStudentName(e.target.value)} style={inputStyle} required />
            <button type="submit" style={buttonStyle}>Add Student</button>
          </form>
        );
      case 'resource':
        return (
          <form onSubmit={handleResourceSubmit} style={fadeInStyle}>
            <input type="text" placeholder="Book Title" value={bookTitle} onChange={e => setBookTitle(e.target.value)} style={inputStyle} required />
            <input type="text" placeholder="Author" value={bookAuthor} onChange={e => setBookAuthor(e.target.value)} style={inputStyle} required />
            <input type="file" onChange={e => setBookFile(e.target.files[0])} style={inputStyle} required />
            <button type="submit" style={buttonStyle}>Upload Resource</button>
          </form>
        );
      case 'result':
      default:
        return (
          <form onSubmit={handleResultSubmit} style={fadeInStyle}>
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
        <h3 style={{ marginBottom: '1rem' }}>📂 Admin Tools</h3>
        <button onClick={() => setActiveTab('student')} style={{ ...sideButtonStyle, backgroundColor: activeTab === 'student' ? '#ccc' : '#e0e0e0' }}>➕ Add Student</button>
        <button onClick={() => setActiveTab('resource')} style={{ ...sideButtonStyle, backgroundColor: activeTab === 'resource' ? '#ccc' : '#e0e0e0' }}>📚 Add Resource</button>
        <button onClick={() => setActiveTab('result')} style={{ ...sideButtonStyle, backgroundColor: activeTab === 'result' ? '#ccc' : '#e0e0e0' }}>📝 Add Result</button>
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
  width: '220px',
  backgroundColor: '#f4f4f4',
  padding: '20px',
  borderRight: '1px solid #ccc',
  boxShadow: '2px 0 5px rgba(0,0,0,0.05)'
};

const sideButtonStyle = {
  display: 'block',
  width: '100%',
  padding: '12px',
  marginBottom: '10px',
  backgroundColor: '#e0e0e0',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'background-color 0.3s ease'
};

const fadeInStyle = {
  animation: 'fadein 0.3s ease-in-out'
};
