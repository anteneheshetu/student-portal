
import React, { useState } from 'react';

export default function StudentSubmission() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const studentId = localStorage.getItem('studentId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage('Please select a file');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('studentId', studentId);
    formData.append('file', file);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/submissions`, {
        method: 'POST',
        body: formData
      });

      const result = await res.json();
      if (res.ok) {
        setMessage('✅ Submission uploaded successfully!');
        setTitle('');
        setFile(null);
      } else {
        setMessage(result.error || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: 'auto' }}>
      <h2>📤 Submit Your Work</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
          style={{ marginBottom: '20px' }}
        />
        <button type="submit" style={buttonStyle}>Upload</button>
      </form>
      {message && <p>{message}</p>}
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
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};
