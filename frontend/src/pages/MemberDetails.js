import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/members';
const BACKEND  = 'http://localhost:5000';

// ─── Detail Row ───────────────────────────────────────────────────────────────
function Row({ icon, label, value }) {
  if (!value) return null;
  return (
    <div
      style={{
        display: 'flex', gap: '1rem', alignItems: 'flex-start',
        padding: '0.9rem 1.1rem',
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'all 0.18s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(251,191,36,0.05)';
        e.currentTarget.style.borderColor = 'rgba(251,191,36,0.18)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
      }}
    >
      <div style={{
        width: '38px', height: '38px', flexShrink: 0,
        background: 'rgba(251,191,36,0.10)',
        border: '1px solid rgba(251,191,36,0.20)',
        borderRadius: '10px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.1rem',
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '0.68rem', fontWeight: 700,
          color: 'var(--gold-400)', textTransform: 'uppercase',
          letterSpacing: '0.8px', marginBottom: '0.2rem',
        }}>{label}</div>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {value}
        </div>
      </div>
    </div>
  );
}

// ─── MemberDetails ────────────────────────────────────────────────────────────
function MemberDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [imgErr, setImgErr]   = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/${id}`);
        setMember(res.data.data);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? 'Member not found. They may have been removed.'
            : err.response?.data?.message || 'Could not load member details.'
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return (
    <div className="page-container">
      <div className="spinner-container"><div className="spinner" /><span>Loading profile…</span></div>
    </div>
  );

  if (error) return (
    <div className="page-container">
      <div className="alert alert-error">❌ {error}</div>
      <button className="btn btn-secondary" onClick={() => navigate('/view-members')}>← Back</button>
    </div>
  );

  if (!member) return null;

  const imgUrl = member.image && !imgErr ? `${BACKEND}${member.image}` : null;

  return (
    <div className="page-container">

      {/* Action bar */}
      <div style={{ display:'flex', gap:'0.75rem', marginBottom:'1.75rem', flexWrap:'wrap' }}>
        <button id="btn-back" className="btn btn-secondary"
          onClick={() => navigate('/view-members')}>
          ← Back to Directory
        </button>
        <button id="btn-edit-profile" className="btn btn-edit btn-lg"
          onClick={() => navigate(`/edit-member/${member._id}`)}>
          ✏️ Edit Profile
        </button>
      </div>

      {/* Profile header */}
      <div
        style={{
          background: 'rgba(6,14,42,0.92)',
          border: '1px solid var(--border-gold)',
          borderTop: '3px solid var(--gold-400)',
          borderRadius: '18px',
          padding: '2.25rem',
          display: 'flex', gap: '2rem', alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '1.75rem',
          backdropFilter: 'blur(18px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
        }}
      >
        {/* Avatar */}
        <div style={{ flexShrink: 0 }}>
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={member.name}
              onError={() => setImgErr(true)}
              style={{
                width: '140px', height: '140px',
                objectFit: 'cover',
                objectPosition: 'top center',
                borderRadius: '50%',
                border: '4px solid var(--gold-400)',
                boxShadow: '0 8px 30px rgba(251,191,36,0.4)',
              }}
            />
          ) : (
            <div style={{
              width: '140px', height: '140px', borderRadius: '50%',
              background: 'rgba(251,191,36,0.08)',
              border: '4px dashed rgba(251,191,36,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '3.5rem',
            }}>👤</div>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div className="badge" style={{ marginBottom: '0.6rem' }}>Team Sharks Member</div>
          <h1 style={{
            fontFamily: 'Montserrat, Open Sans, sans-serif',
            fontSize: '1.9rem', fontWeight: 900,
            color: '#fff', marginBottom: '0.75rem',
          }}>
            {member.name}
          </h1>

          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
            {[
              { label: member.rollNumber,  bg: 'rgba(59,117,232,0.18)',  border: 'rgba(59,117,232,0.35)',  color: 'var(--blue-300)' },
              { label: member.year,        bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.30)', color: 'var(--gold-200)' },
              { label: member.degree,      bg: 'rgba(5,150,105,0.12)',  border: 'rgba(5,150,105,0.28)',  color: '#6ee7b7' },
            ].map((chip, i) => (
              chip.label && (
                <span key={i} style={{
                  padding: '4px 14px',
                  background: chip.bg,
                  border: `1px solid ${chip.border}`,
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  color: chip.color,
                  fontWeight: 700,
                }}>
                  {chip.label}
                </span>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Detail grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '0.85rem',
        marginBottom: '2rem',
      }}>
        <Row icon="📁" label="Project"        value={member.project} />
        <Row icon="🎯" label="Hobbies"        value={member.hobbies} />
        <Row icon="🏆" label="Certificate"    value={member.certificate} />
        <Row icon="💼" label="Internship"     value={member.internship} />
        <Row icon="🌟" label="About Your Aim" value={member.aboutYourAim} />
        <Row icon="🎓" label="Degree"         value={member.degree} />
        <Row icon="📅" label="Year"           value={member.year} />
        <Row icon="🎫" label="Roll Number"    value={member.rollNumber} />
      </div>

      {/* Timestamp */}
      {member.createdAt && (
        <div style={{
          padding: '0.75rem 1rem',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '10px',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          display: 'flex', gap: '2rem', flexWrap: 'wrap',
        }}>
          <span>🕐 Added: {new Date(member.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
          {member.updatedAt && member.updatedAt !== member.createdAt && (
            <span>✏️ Updated: {new Date(member.updatedAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default MemberDetails;
