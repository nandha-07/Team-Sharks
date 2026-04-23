import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import AddMember from './pages/AddMember';
import ViewMembers from './pages/ViewMembers';
import MemberDetails from './pages/MemberDetails';
import EditMember from './pages/EditMember';

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <NavLink to="/" className="navbar-brand">
          {/* SRM Logo */}
          <img
            src="/srm-logo.webp"
            alt="SRM Logo"
            style={{
              width: '52px',
              height: '52px',
              objectFit: 'contain',
              borderRadius: '50%',
              border: '2px solid var(--gold-400)',
              background: '#fff',
              padding: '2px',
              boxShadow: '0 0 14px rgba(251,191,36,0.4)',
              flexShrink: 0,
            }}
          />
          <div>
            <div className="brand-text">
              TEAM <span>SHARKS</span>
            </div>
            <div className="brand-subtitle">SRM Institute of Science &amp; Technology</div>
          </div>
        </NavLink>

        {/* Links */}
        <ul className="navbar-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-member" className={({ isActive }) => isActive ? 'active' : ''}>
              Add Member
            </NavLink>
          </li>
          <li>
            <NavLink to="/view-members" className={({ isActive }) => isActive ? 'active' : ''}>
              Team Directory
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/"                element={<Home />} />
            <Route path="/add-member"      element={<AddMember />} />
            <Route path="/view-members"    element={<ViewMembers />} />
            <Route path="/member/:id"      element={<MemberDetails />} />
            <Route path="/edit-member/:id" element={<EditMember />} />
            <Route
              path="*"
              element={
                <div className="page-container">
                  <div className="empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <h3>Page Not Found</h3>
                    <p>The page you're looking for doesn't exist.</p>
                    <NavLink to="/" className="btn btn-primary btn-lg">
                      Go to Home
                    </NavLink>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer
          style={{
            textAlign: 'center',
            padding: '1.2rem 1rem',
            borderTop: '1px solid rgba(251,191,36,0.15)',
            color: 'var(--text-muted)',
            fontSize: '0.78rem',
            background: 'rgba(5,12,36,0.75)',
            backdropFilter: 'blur(12px)',
            letterSpacing: '0.3px',
          }}
        >
          © {new Date().getFullYear()}&nbsp;&nbsp;
          <span style={{ color: 'var(--gold-300)', fontWeight: 700 }}>TEAM SHARKS</span>
          &nbsp;·&nbsp; Student Management Application &nbsp;·&nbsp; SRM Institute of Science &amp; Technology
        </footer>
      </div>
    </Router>
  );
}

export default App;
