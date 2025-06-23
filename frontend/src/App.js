// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Students from './pages/Students';
import Resources from './pages/Resources';
import Results from './pages/Results';
import Admin from './pages/Admin';
import Login from './pages/Login';
import StudentLogin from './pages/StudentLogin';
import StudentProfile from './pages/StudentProfile';

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem('isLoggedIn') === 'true';
  const studentId = localStorage.getItem('studentId');

  return (
    <div>
      <nav style={{ backgroundColor: '#007acc', padding: '10px 20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/" style={navLink}>Home</Link>
        {isAdmin && <Link to="/students" style={navLink}>Students</Link>}

          <Link to="/resources" style={navLink}>Resources</Link>
         {(isAdmin) && <Link to="/results" style={navLink}>Results</Link>}

          {isAdmin && <Link to="/admin" style={navLink}>Admin</Link>}
        </div>
        <div>
          {!isAdmin && !studentId ? (
            <>
              <button onClick={() => navigate('/login')} style={navBtn}>Admin Login</button>{' '}
              <button onClick={() => navigate('/student-login')} style={navBtn}>Student Login</button>
            </>
          ) : (
            <button onClick={() => {
              localStorage.removeItem('isLoggedIn');
              localStorage.removeItem('studentId');
              setIsLoggedIn(false);
              navigate('/');
            }} style={navBtn}>Logout</button>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/results" element={<Results />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/students/:id" element={<StudentProfile />} />
      </Routes>
    </div>
  );
}

const navLink = {
  color: 'white',
  marginRight: '15px',
  textDecoration: 'none',
  fontWeight: 'bold'
};

const navBtn = {
  backgroundColor: 'white',
  color: '#007acc',
  border: 'none',
  borderRadius: '4px',
  padding: '6px 12px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default AppWrapper;

