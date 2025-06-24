// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// File upload setup
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const DATA_FILE = path.join(__dirname, 'data.json');

let data = { students: [], books: [], submissions: [] };

function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    data = JSON.parse(fs.readFileSync(DATA_FILE));
  }
}

function saveData() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

loadData();

// Teacher uploads a document
app.post('/books/upload', upload.single('file'), (req, res) => {
  const { title, author } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  const book = {
    title,
    author,
    filename: file.filename,
    url: `/uploads/${file.filename}`
  };

  data.books.push(book);
  saveData();
  res.status(201).json(book);
});

// Student submits work
app.post('/submissions', upload.single('file'), (req, res) => {
  const { studentId, title } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  const submission = {
    studentId,
    title,
    filename: file.filename,
    url: `/uploads/${file.filename}`,
    date: new Date().toISOString().split('T')[0]
  };

  if (!data.submissions) data.submissions = [];
  data.submissions.push(submission);
  saveData();
  res.status(201).json(submission);
});

// Get student submissions
app.get('/submissions/:studentId', (req, res) => {
  const studentId = req.params.studentId;
  const filtered = (data.submissions || []).filter(s => s.studentId === studentId);
  res.json(filtered);
});

// Existing routes (e.g., /students, /results, etc.) should follow here

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
