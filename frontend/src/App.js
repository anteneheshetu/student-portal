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
import AdminUpload from './pages/AdminUpload';
import StudentSubmission from './pages/StudentSubmission';
import { FaBars, FaTimes } from 'react-icons/fa';

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [isMenuOpen, setIsMenuOpen] = useState(false); // mobile toggle
    const navigate = useNavigate();

    const isAdmin = localStorage.getItem('isLoggedIn') === 'true';
    const studentId = localStorage.getItem('studentId');

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div>
            {/* ✅ Navbar */}
            <nav style={navbar}>
                {/* Left section: Logo + Site name */}
                <div style={navLeft}>
                    <img src="/images/bis-logo.png" alt="BIS Logo" style={{ height: '40px', marginRight: '10px' }} />
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>Student Portal</span>

                    {/* Hamburger toggle */}
                    <button onClick={toggleMenu} className="menu-toggle-btn" style={menuToggleBtn}>
                        {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>

                {/* Links */}
                <div style={{ ...navLinks, ...(isMenuOpen ? navLinksShow : {}) }}>
                    <Link to="/" style={navLink} onClick={closeMenu}>Home</Link>

                    {/* Resources Dropdown */}
                    <div className="dropdown">
                        <span style={navLink}>Resources ▾</span>
                        <div className="dropdown-content animated-dropdown">
                            <Link to="/resources" onClick={closeMenu}>All Books</Link>
                            <Link to="/submit-work" onClick={closeMenu}>Submit Work</Link>
                        </div>
                    </div>

                    {/* Admin Dropdown (only if logged in) */}
                    {isAdmin && (
                        <div className="dropdown">
                            <span style={navLink}>Admin ▾</span>
                            <div className="dropdown-content animated-dropdown">
                                <Link to="/admin" onClick={closeMenu}>Dashboard</Link>
                                <Link to="/admin-upload" onClick={closeMenu}>Upload Material</Link>
                                <Link to="/results" onClick={closeMenu}>Results</Link>
                                <Link to="/students" onClick={closeMenu}>Students</Link>
                            </div>
                        </div>
                    )}

                    {/* Auth buttons */}
                    {!isAdmin && !studentId ? (
                        <>
                            <button onClick={() => { navigate('/login'); closeMenu(); }} style={navBtn}>Admin Login</button>
                            <button onClick={() => { navigate('/student-login'); closeMenu(); }} style={navBtn}>Student Login</button>
                        </>
                    ) : (
                        <button onClick={() => {
                            localStorage.removeItem('isLoggedIn');
                            localStorage.removeItem('studentId');
                            setIsLoggedIn(false);
                            navigate('/');
                            closeMenu();
                        }} style={navBtn}>Logout</button>
                    )}
                </div>
            </nav>


            {/* Your Routes stay the same */}
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



const navbar = {
    backgroundColor: '#007acc',
    color: 'white',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    position: 'relative',
    zIndex: 10
};

const navLeft = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
};

const navLink = {
    color: 'white',
    margin: '5px 10px',
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer'
};

const navBtn = {
    backgroundColor: 'white',
    color: '#007acc',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    margin: '5px 10px'
};

const menuToggleBtn = {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    display: 'none',
    fontSize: '1.5rem'
};

const navLinks = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    transition: 'all 0.3s ease-in-out'
};

const navLinksShow = {
    flexDirection: 'column',
    position: 'absolute',
    top: '60px',
    left: '0',
    right: '0',
    backgroundColor: '#007acc',
    zIndex: '10',
    padding: '10px'
};





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


const navLinksContainer = {
    marginTop: '10px'
};

const navGroup = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    paddingBottom: '10px'
};



const hamburgerBtn = {
    background: 'transparent',
    color: 'white',
    fontSize: '1.5rem',
    border: 'none',
    cursor: 'pointer'
};














export default AppWrapper;
