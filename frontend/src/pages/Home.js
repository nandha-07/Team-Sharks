import React from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, desc, accent }) {
  return (
    <div
      style={{
        background: 'rgba(8,18,50,0.88)',
        border: `1px solid ${accent}30`,
        borderTop: `3px solid ${accent}`,
        borderRadius: '14px',
        padding: '1.5rem 1.25rem',
        backdropFilter: 'blur(18px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        transition: 'all 0.22s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(0,0,0,0.55)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'; }}
    >
      <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{icon}</div>
      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>{label}</div>
      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{desc}</div>
    </div>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-container">

      {/* ── Hero ── */}
      <div style={{ textAlign: 'center', padding: '3.5rem 1rem 2.5rem' }}>
        <div className="badge">🏫 SRM Institute of Science &amp; Technology</div>

        <h1
          style={{
            fontFamily: 'Montserrat, Open Sans, sans-serif',
            fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)',
            fontWeight: 900,
            lineHeight: 1.18,
            color: '#ffffff',
            marginBottom: '0.5rem',
            letterSpacing: '-0.5px',
          }}
        >
          Welcome to
        </h1>
        <h2
          style={{
            fontFamily: 'Montserrat, Open Sans, sans-serif',
            fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)',
            fontWeight: 900,
            lineHeight: 1.18,
            color: 'var(--gold-300)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.5px',
          }}
        >
          TEAM SHARKS
        </h2>

        <p
          style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            maxWidth: '500px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.75,
          }}
        >
          A centralised platform to manage student team members — register profiles,
          upload photos, edit records, and explore the full directory.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            id="hero-add-member"
            className="btn btn-primary btn-xl"
            onClick={() => navigate('/add-member')}
          >
            + Add Member
          </button>
          <button
            id="hero-view-members"
            className="btn btn-blue btn-xl"
            onClick={() => navigate('/view-members')}
          >
            Team Directory
          </button>
        </div>
      </div>

      {/* ── Gold divider ── */}
      <div className="divider" />

      {/* ── Manage Team section ── */}
      <div className="panel" style={{ marginBottom: '2.5rem' }}>
        <div className="panel-title">Manage Team</div>

        <div className="grid-2">
          <button
            id="section-add-member"
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/add-member')}
            style={{ justifyContent: 'flex-start', padding: '1.25rem 1.5rem', gap: '1rem' }}
          >
            <span style={{ fontSize: '1.8rem' }}>➕</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Add Member</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 400, opacity: 0.75, marginTop: '2px' }}>
                Register a new team member with full details &amp; photo
              </div>
            </div>
          </button>

          <button
            id="section-view-members"
            className="btn btn-blue btn-lg"
            onClick={() => navigate('/view-members')}
            style={{ justifyContent: 'flex-start', padding: '1.25rem 1.5rem', gap: '1rem' }}
          >
            <span style={{ fontSize: '1.8rem' }}>👥</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>View Members</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 400, opacity: 0.75, marginTop: '2px' }}>
                Browse, search and manage the entire team directory
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem',
        }}
      >
        <StatCard icon="📋" label="Detailed Profiles" desc="Store degree, year, certificates, internships and personal aims"  accent="var(--gold-400)" />
        <StatCard icon="📸" label="Profile Photos"    desc="Upload and display professional profile photos for each member"  accent="var(--blue-400)" />
        <StatCard icon="✏️" label="Edit Records"      desc="Update any member's information or photo at any time"            accent="var(--gold-400)" />
        <StatCard icon="🔍" label="Quick Search"      desc="Instantly search across names, roll numbers and degrees"          accent="var(--blue-400)" />
      </div>
    </div>
  );
}

export default Home;
