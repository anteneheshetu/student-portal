// Resources.jsx
import React, { useEffect, useState } from 'react';
import ResponsiveLayout from './ResponsiveLayout';

export default function Resources() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/books`)
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  const handleDelete = async (filename) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return;
    const res = await fetch(`${process.env.REACT_APP_API_URL}/books/${filename}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      setBooks(prev => prev.filter(book => book.filename !== filename));
    } else {
      alert('Failed to delete resource');
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ResponsiveLayout>
      <h2>📚 Available Resources</h2>
      <input
        type="text"
        placeholder="Search by title or author"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          border: '1px solid #ccc',
          borderRadius: '6px'
        }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {filteredBooks.map((book, index) => (
          <div key={index} style={cardStyle}>
            <h3 style={{ marginBottom: '0.5rem' }}>{book.title}</h3>
            <p style={{ marginBottom: '1rem' }}>by {book.author}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <a
                href={`${process.env.REACT_APP_API_URL}${book.url}`}
                download
                style={{ ...linkStyle, marginRight: '10px' }}
              >
                ⬇ Download
              </a>
              <button
                onClick={() => handleDelete(book.filename)}
                style={deleteButtonStyle}
              >
                ❌ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </ResponsiveLayout>
  );
}

const cardStyle = {
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
};

const linkStyle = {
  color: '#007bff',
  textDecoration: 'none',
  fontWeight: 'bold'
};

const deleteButtonStyle = {
  padding: '6px 10px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#dc3545',
  color: 'white',
  cursor: 'pointer'
};
