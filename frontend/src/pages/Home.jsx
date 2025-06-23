import React, { useEffect, useState } from 'react';

export default function Home() {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/students').then(res => res.json()).then(setStudents);
    fetch('http://localhost:5000/books').then(res => res.json()).then(setBooks);
    fetch('http://localhost:5000/results').then(res => res.json()).then(setResults);
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '30px' }}>📈 Dashboard Summary</h2>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <Card title="Total Students" value={students.length} icon="👨‍🎓" />
        <Card title="Total Books" value={books.length} icon="📚" />
        <Card title="Total Results" value={results.length} icon="📝" />
      </div>
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '25px 20px',
      borderRadius: '12px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      minWidth: '220px',
      flex: '1 1 220px',
    }}>
      <div style={{ fontSize: '20px', marginBottom: '10px' }}>{icon} {title}</div>
      <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#007acc' }}>{value}</div>
    </div>
  );
}
