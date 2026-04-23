import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/members';
const BACKEND = 'http://localhost:5000';

// ─── Member Card ──────────────────────────────────────────────────────────────
function MemberCard({ member, onView, onEdit }) {
  const imgUrl = member.image ? `${BACKEND}${member.image}` : null;
  const [imgErr, setImgErr] = useState(false);

  return (
    <div
      style={{
        background: 'rgba(6,14,42,0.90)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        overflow: 'hidden',
        backdropFilter: 'blur(18px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
        transition: 'all 0.22s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(251,191,36,0.35)';
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.55)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.45)';
      }}
    >
      {/* Photo area */}
      <div
        style={{
          height: '240px',
          background: 'linear-gradient(160deg, #0d2252, #060e2a)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {imgUrl && !imgErr ? (
          <img
            src={imgUrl}
            alt={member.name}
            onError={() => setImgErr(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
          />
        ) : (
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'rgba(251,191,36,0.10)',
            border: '2px solid rgba(251,191,36,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.5rem',
          }}>👤</div>
        )}
        {/* Year chip */}
        <span style={{
          position: 'absolute', top: 10, right: 10,
          background: 'rgba(251,191,36,0.92)',
          color: '#0a1840',
          fontSize: '0.68rem', fontWeight: 800,
          padding: '3px 10px', borderRadius: '20px',
          letterSpacing: '0.3px',
        }}>
          {member.year || '—'}
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: '1.15rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
        <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff', lineHeight: 1.3 }}>
          {member.name}
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--gold-300)', fontWeight: 600 }}>
          {member.rollNumber}
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {member.degree}
        </div>

        {member.project && (
          <div style={{
            fontSize: '0.75rem', color: 'var(--text-secondary)',
            marginTop: '0.4rem', lineHeight: 1.45,
            overflow: 'hidden', display: '-webkit-box',
            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          }}>
            {member.project}
          </div>
        )}

        <div style={{ flex: 1 }} />

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button
            id={`btn-view-${member._id}`}
            className="btn btn-primary"
            style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
            onClick={() => onView(member._id)}
          >
            View Details
          </button>
          <button
            id={`btn-edit-${member._id}`}
            className="btn btn-edit"
            style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}
            onClick={() => onEdit(member._id)}
            title="Edit member"
          >
            ✏️ Edit
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ViewMembers ──────────────────────────────────────────────────────────────
function ViewMembers() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [search, setSearch]   = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError('');
        const res = await axios.get(API_URL);
        setMembers(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load members. Is the backend running on port 5000?');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = members.filter(m =>
    [m.name, m.rollNumber, m.degree].some(v =>
      v?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="page-container">

      {/* Header row */}
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between',
        flexWrap:'wrap', gap:'1rem', marginBottom:'2rem' }}>
        <div className="page-heading" style={{ marginBottom:0 }}>
          <div className="badge">Team Directory</div>
          <h1>View Members</h1>
          <p>
            {loading ? 'Loading…' : `${filtered.length} member${filtered.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        <button id="btn-add-new" className="btn btn-primary btn-lg"
          onClick={() => navigate('/add-member')}
          style={{ alignSelf:'flex-start', marginTop:'1.2rem' }}>
          + Add Member
        </button>
      </div>

      {/* Search */}
      {!loading && members.length > 0 && (
        <div className="search-bar" style={{ marginBottom: '1.75rem' }}>
          <span className="search-bar-icon">🔍</span>
          <input
            id="search-input"
            type="text"
            placeholder="Search by name, roll number or degree…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* States */}
      {loading && (
        <div className="spinner-container">
          <div className="spinner" />
          <span>Loading team members…</span>
        </div>
      )}

      {!loading && error && <div className="alert alert-error">❌ {error}</div>}

      {!loading && !error && members.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <h3>No Members Yet</h3>
          <p>Be the first to add a team member to the directory.</p>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/add-member')}>
            + Add First Member
          </button>
        </div>
      )}

      {!loading && !error && members.length > 0 && filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>No Results</h3>
          <p>No members match your search.</p>
          <button className="btn btn-secondary" onClick={() => setSearch('')}>Clear Search</button>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid-3">
          {filtered.map(m => (
            <MemberCard
              key={m._id}
              member={m}
              onView={id => navigate(`/member/${id}`)}
              onEdit={id => navigate(`/edit-member/${id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewMembers;
