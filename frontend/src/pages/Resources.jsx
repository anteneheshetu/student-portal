import React, { useEffect, useState } from 'react';

export default function Resources() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/books')
      .then((res) => res.json())
      .then(setBooks)
      .catch((err) => console.error('Error fetching books:', err));
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>📚 Available Books</h2>

      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {books.map((book, i) => (
            <div key={i} style={cardStyle}>
              <h3 style={{ margin: 0 }}>{book.title}</h3>
              <p style={{ margin: '8px 0 0', color: '#666' }}>by {book.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  minWidth: '220px',
  flex: '1 1 220px'
};
