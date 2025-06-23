const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Load data
let data = { students: [], books: [], results: [] };

try {
  const raw = fs.readFileSync('data.json');
  data = JSON.parse(raw);
} catch {
  console.log('No existing data, starting fresh.');
}

// Save helper
function saveData() {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}

// === STUDENTS ===
app.get('/students', (req, res) => res.json(data.students));

app.post('/students', (req, res) => {
  const student = { ...req.body, results: [] };
  data.students.push(student);
  saveData();
  res.status(201).send('Student added');
});

// === BOOKS ===
app.get('/books', (req, res) => res.json(data.books));

app.post('/books', (req, res) => {
  data.books.push(req.body);
  saveData();
  res.status(201).send('Book added');
});

// === STUDENT-SPECIFIC RESULTS ===
app.get('/students/:id/results', (req, res) => {
  const student = data.students.find(s => s.id === req.params.id);
  if (!student) return res.status(404).send('Student not found');
  res.json(student.results || []);
});

app.post('/students/:id/results', (req, res) => {
  const student = data.students.find(s => s.id === req.params.id);
  if (!student) return res.status(404).send('Student not found');

  const result = {
    subject: req.body.subject,
    score: req.body.score,
    date: req.body.date || new Date().toISOString().slice(0, 10)
  };

  student.results.push(result);
  saveData();
  res.status(201).send('Result added');
});

// === GLOBAL RESULTS LIST ===
app.get('/results', (req, res) => {
  const allResults = data.students.flatMap(s =>
    (s.results || []).map(r => ({
      studentId: s.id,
      name: s.name,
      ...r
    }))
  );
  res.json(allResults);
});

app.post('/results', (req, res) => {
  const { studentId, subject, score, date } = req.body;
  const student = data.students.find(s => s.id === studentId);
  if (!student) return res.status(404).send('Student not found');

  const result = {
    subject,
    score,
    date: date || new Date().toISOString().slice(0, 10)
  };

  student.results.push(result);
  saveData();
  res.status(201).send('Result added globally');
});

// === Start Server ===
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
