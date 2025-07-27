import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Students from './pages/Students';
import Resources from './pages/Resources';
import Results from './pages/Results';
import Admin from './pages/Admin';
import Login from './pages/Login';
import StudentLogin from './pages/StudentLogin';
import StudentProfile from './pages/StudentProfile';
import AdminUpload from './pages/AdminUpload';
import StudentSubmission from './pages/StudentSubmission';

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const isAdmin = localStorage.getItem('isLoggedIn') === 'true';
    const studentId = localStorage.getItem('studentId');

    return (
        <div>
            <nav style={navStyle}>
                <div style={navHeader}>
                    <Link to="/" style={navBrand}>Student Portal</Link>
                    <button onClick={() => setMenuOpen(!menuOpen)} style={hamburgerBtn}>☰</button>
                </div>

                <div style={{ ...navLinksContainer, display: menuOpen ? 'block' : 'none' }}>
                    <div style={navGroup}>
                        <Link to="/" style={navLink}>Home</Link>
                        {isAdmin && <Link to="/students" style={navLink}>Students</Link>}
                        <Link to="/resources" style={navLink}>Resources</Link>
                        {isAdmin && <Link to="/results" style={navLink}>Results</Link>}
                        {isAdmin && <Link to="/admin" style={navLink}>Admin</Link>}
                        {isAdmin && <Link to="/admin-upload" style={navLink}>Upload Material</Link>}
                        {studentId && <Link to="/submit-work" style={navLink}>Submit Work</Link>}
                    </div>

                    <div style={navGroup}>
                        {!isAdmin && !studentId ? (
                            <>
                                <button onClick={() => navigate('/login')} style={navBtn}>Admin Login</button>
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
                <Route path="/admin-upload" element={<AdminUpload />} />
                <Route path="/submit-work" element={<StudentSubmission />} />
            </Routes>
        </div>
    );
}

// 🔧 Style definitions
const navStyle = {
    backgroundColor: '#007acc',
    padding: '10px 20px',
    color: 'white'
};

const navHeader = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

const navBrand = {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    textDecoration: 'none'
};

const navLinksContainer = {
    marginTop: '10px'
};

const navGroup = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    paddingBottom: '10px'
};

const navLink = {
    color: 'white',
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

const hamburgerBtn = {
    background: 'transparent',
    color: 'white',
    fontSize: '1.5rem',
    border: 'none',
    cursor: 'pointer'
};

export default AppWrapper;
