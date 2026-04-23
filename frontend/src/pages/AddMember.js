import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/members';

const INITIAL_FORM = {
  name: '',
  rollNumber: '',
  year: '',
  degree: '',
  project: '',
  hobbies: '',
  certificate: '',
  internship: '',
  aboutYourAim: '',
};

// ─── Reusable Field ───────────────────────────────────────────────────────────
function Field({ label, required, error, children }) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      {children}
      {error && <div className="form-error-text">⚠ {error}</div>}
    </div>
  );
}

// ─── AddMember ────────────────────────────────────────────────────────────────
function AddMember() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', msg: '' });

  const handle = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors(p => ({ ...p, image: 'Select a valid image file.' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(p => ({ ...p, image: 'Image must be under 5 MB.' }));
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setErrors(p => ({ ...p, image: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.rollNumber.trim()) e.rollNumber = 'Roll number is required.';
    if (!form.year.trim()) e.year = 'Year is required.';
    if (!form.degree.trim()) e.degree = 'Degree is required.';
    if (!form.project.trim()) e.project = 'Project description is required.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: '', msg: '' });
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      setAlert({ type: 'error', msg: 'Please fill in all required fields.' });
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('image', image);
      await axios.post(API_URL, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setAlert({ type: 'success', msg: '✅ Member added successfully! Redirecting…' });
      setTimeout(() => navigate('/view-members'), 1800);
    } catch (err) {
      setAlert({ type: 'error', msg: err.response?.data?.message || 'Failed to add member. Is the backend running?' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setImage(null);
    setPreview(null);
    setErrors({});
    setAlert({ type: '', msg: '' });
  };

  return (
    <div className="page-container">
      <div className="page-heading">
        <div className="badge">New Member</div>
        <h1>Add Team Member</h1>
        <p>Fill in the details below to register a new member to Team Blue.</p>
      </div>

      {alert.msg && (
        <div className={`alert alert-${alert.type}`}>{alert.msg}</div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 300px',
            gap: '1.75rem',
            alignItems: 'start',
          }}
        >
          {/* ── Left — form fields ── */}
          <div>
            <div className="panel" style={{ marginBottom: '1.5rem' }}>
              <div className="panel-title">Personal Information</div>

              <div className="grid-2">
                <Field label="Full Name" required error={errors.name}>
                  <input name="name" value={form.name} onChange={handle}
                    placeholder="e.g. Priya Sharma"
                    className={`form-input${errors.name ? ' error' : ''}`} />
                </Field>

                <Field label="Roll Number" required error={errors.rollNumber}>
                  <input name="rollNumber" value={form.rollNumber} onChange={handle}
                    placeholder="e.g. 22CS047"
                    className={`form-input${errors.rollNumber ? ' error' : ''}`} />
                </Field>
              </div>

              <div className="grid-2">
                <Field label="Year" required error={errors.year}>
                  <select name="year" value={form.year} onChange={handle}
                    className={`form-input form-select${errors.year ? ' error' : ''}`}>
                    <option value="">Select Year</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </Field>

                <Field label="Degree" required error={errors.degree}>
                  <input name="degree" value={form.degree} onChange={handle}
                    placeholder="e.g. B.Tech CSE"
                    className={`form-input${errors.degree ? ' error' : ''}`} />
                </Field>
              </div>
            </div>

            <div className="panel" style={{ marginBottom: '1.5rem' }}>
              <div className="panel-title">Academic &amp; Professional Details</div>

              <Field label="About Project" required error={errors.project}>
                <textarea name="project" value={form.project} onChange={handle}
                  placeholder="Describe your project..."
                  className={`form-input form-textarea${errors.project ? ' error' : ''}`} rows={3} />
              </Field>

              <Field label="Hobbies (comma separated)">
                <input name="hobbies" value={form.hobbies} onChange={handle}
                  placeholder="e.g. Reading, Coding, Chess"
                  className="form-input" />
              </Field>

              <div className="grid-2">
                <Field label="Certificate">
                  <input name="certificate" value={form.certificate} onChange={handle}
                    placeholder="e.g. AWS Cloud Practitioner"
                    className="form-input" />
                </Field>

                <Field label="Internship">
                  <input name="internship" value={form.internship} onChange={handle}
                    placeholder="e.g. Google SWE Intern 2024"
                    className="form-input" />
                </Field>
              </div>

              <Field label="About Your Aim">
                <textarea name="aboutYourAim" value={form.aboutYourAim} onChange={handle}
                  placeholder="Describe your career goal and aspirations..."
                  className="form-input form-textarea" rows={3} />
              </Field>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button id="btn-submit" type="submit" className="btn btn-primary btn-lg"
                disabled={loading} style={{ flex: 1 }}>
                {loading ? (
                  <>
                    <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                    Submitting…
                  </>
                ) : 'Add Member'}
              </button>
              <button type="button" className="btn btn-secondary btn-lg" onClick={resetForm}>
                Reset
              </button>
              <button type="button" className="btn btn-secondary btn-lg"
                onClick={() => navigate('/view-members')}>
                Cancel
              </button>
            </div>
          </div>

          {/* ── Right — photo upload ── */}
          <div className="panel" style={{ position: 'sticky', top: '86px' }}>
            <div className="panel-title">Profile Photo</div>

            {/* Avatar preview */}
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              {preview ? (
                <img src={preview} alt="Preview"
                  style={{
                    width: '140px', height: '140px',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    borderRadius: '50%',
                    border: '3px solid var(--gold-400)',
                    boxShadow: '0 6px 24px rgba(251,191,36,0.35)',
                  }} />
              ) : (
                <div style={{
                  width: '140px', height: '140px',
                  borderRadius: '50%',
                  background: 'rgba(251,191,36,0.06)',
                  border: '2px dashed var(--border-gold)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '3rem',
                  margin: '0 auto',
                }}>👤</div>
              )}
            </div>

            <div className="file-input-wrapper">
              <label className="file-input-label" htmlFor="input-image">
                <span className="upload-icon">📷</span>
                <span className="upload-text">{image ? image.name : 'Click to upload photo'}</span>
                <span className="upload-hint">JPG · PNG · WEBP · Max 5 MB</span>
              </label>
              <input id="input-image" type="file" accept="image/*" onChange={handleImage} />
            </div>

            {errors.image && <div className="form-error-text" style={{ marginTop: '0.5rem' }}>⚠ {errors.image}</div>}
            {image && <div className="file-preview">✅ {image.name}</div>}

            <div className="divider" />

            <ul style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: '1rem' }}>
              <li>Use a clear, front-facing portrait</li>
              <li>Good lighting improves quality</li>
              <li>Square crop works best</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddMember;
