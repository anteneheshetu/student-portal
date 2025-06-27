import ResponsiveLayout from './ResponsiveLayout';

import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/Logout');
    }
  }, [navigate]);

  // ...rest of your Admin page code
return (
  <ResponsiveLayout>
  // Student Form
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentMsg, setStudentMsg] = useState('');

  // Book Form
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookMsg, setBookMsg] = useState('');

  // Result Form
  const [resultStudentId, setResultStudentId] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState('');
  const [resultMsg, setResultMsg] = useState('');

  // Handlers
  const handleAddStudent = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: studentId, name: studentName, results: [] })
    });
    setStudentMsg(res.ok ? '✅ Student added!' : '❌ Failed');
    setStudentId('');
    setStudentName('');
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: bookTitle, author: bookAuthor })
    });
    setBookMsg(res.ok ? '✅ Book added!' : '❌ Failed');
    setBookTitle('');
    setBookAuthor('');
  };

  const handleAddResult = async (e) => {
    e.preventDefault();


    const res = await fetch(`${process.env.REACT_APP_API_URL}/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId: resultStudentId, subject, score })
    });
    setResultMsg(res.ok ? '✅ Result added!' : '❌ Failed');
    setResultStudentId('');
    setSubject('');
    setScore('');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{
        width: '220px',
        background: '#007acc',
        color: 'white',
        padding: '20px',
        flexShrink: 0
      }}>
        <h2 style={{ fontSize: '20px' }}>📘 Admin Panel</h2>
        <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '30px' }}>
          <li style={{ marginBottom: '15px' }}>➕ Add Student</li>
          <li style={{ marginBottom: '15px' }}>📚 Add Book</li>
          <li style={{ marginBottom: '15px' }}>📝 Add Result</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', backgroundColor: '#f9f9f9' }}>
        <h1 style={{ marginBottom: '20px' }}>Welcome, Admin</h1>

        {/* Cards for forms */}
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          {/* Student Card */}
          <div style={cardStyle}>
            <h3>Add Student</h3>
            <form onSubmit={handleAddStudent}>
              <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} required style={inputStyle} />
              <input type="text" placeholder="Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} required style={inputStyle} />
              <button type="submit" style={buttonStyle}>Add</button>
              <p>{studentMsg}</p>
            </form>
          </div>

          {/* Book Card */}
          <div style={cardStyle}>
            <h3>Add Book</h3>
            <form onSubmit={handleAddBook}>
              <input type="text" placeholder="Book Title" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} required style={inputStyle} />
              <input type="text" placeholder="Author" value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} required style={inputStyle} />
              <button type="submit" style={buttonStyle}>Add</button>
              <p>{bookMsg}</p>
            </form>
          </div>

          {/* Result Card */}
          <div style={cardStyle}>
            <h3>Add Result</h3>
            <form onSubmit={handleAddResult}>
              <input type="text" placeholder="Student ID" value={resultStudentId} onChange={(e) => setResultStudentId(e.target.value)} required style={inputStyle} />
              <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required style={inputStyle} />
              <input type="text" placeholder="Score" value={score} onChange={(e) => setScore(e.target.value)} required style={inputStyle} />
              <button type="submit" style={buttonStyle}>Add</button>
              <p>{resultMsg}</p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}



  </ResponsiveLayout>
);

const cardStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  flex: '1',
  minWidth: '250px'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  padding: '10px 15px',
  backgroundColor: '#007acc',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

