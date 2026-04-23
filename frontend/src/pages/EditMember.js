import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/members';
const BACKEND  = 'http://localhost:5000';

const FIELDS = [
  { name:'name',         label:'Full Name',               required:true,  type:'input',    placeholder:'e.g. Priya Sharma' },
  { name:'rollNumber',   label:'Roll Number',              required:true,  type:'input',    placeholder:'e.g. 22CS047' },
  { name:'degree',       label:'Degree',                   required:true,  type:'input',    placeholder:'e.g. B.Tech CSE' },
  { name:'project',      label:'About Project',            required:true,  type:'textarea', placeholder:'Describe the project…' },
  { name:'hobbies',      label:'Hobbies (comma separated)',required:false, type:'input',    placeholder:'Reading, Coding…' },
  { name:'certificate',  label:'Certificate',              required:false, type:'input',    placeholder:'e.g. AWS Cloud Practitioner' },
  { name:'internship',   label:'Internship',               required:false, type:'input',    placeholder:'e.g. Google SWE Intern 2024' },
  { name:'aboutYourAim', label:'About Your Aim',           required:false, type:'textarea', placeholder:'Describe your career goal…' },
];

function EditMember() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm]           = useState({
    name:'', rollNumber:'', year:'', degree:'',
    project:'', hobbies:'', certificate:'', internship:'', aboutYourAim:'',
  });
  const [currentImage, setCurrentImage] = useState('');
  const [newImage, setNewImage]         = useState(null);
  const [preview, setPreview]           = useState(null);
  const [imgErr, setImgErr]             = useState(false);
  const [errors, setErrors]             = useState({});
  const [loading, setLoading]           = useState(true);
  const [saving, setSaving]             = useState(false);
  const [alert, setAlert]               = useState({ type:'', msg:'' });

  // ── Load existing member data ──────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        const m   = res.data.data;
        setForm({
          name:         m.name         || '',
          rollNumber:   m.rollNumber   || '',
          year:         m.year         || '',
          degree:       m.degree       || '',
          project:      m.project      || '',
          hobbies:      m.hobbies      || '',
          certificate:  m.certificate  || '',
          internship:   m.internship   || '',
          aboutYourAim: m.aboutYourAim || '',
        });
        setCurrentImage(m.image || '');
      } catch (err) {
        setAlert({ type:'error', msg: 'Could not load member data. Please go back and try again.' });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handle = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]:'' }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors(p => ({ ...p, image:'Select a valid image file.' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(p => ({ ...p, image:'Image must be under 5 MB.' }));
      return;
    }
    setNewImage(file);
    setPreview(URL.createObjectURL(file));
    setImgErr(false);
    setErrors(p => ({ ...p, image:'' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())       e.name      = 'Name is required.';
    if (!form.rollNumber.trim()) e.rollNumber = 'Roll number is required.';
    if (!form.year.trim())       e.year       = 'Year is required.';
    if (!form.degree.trim())     e.degree     = 'Degree is required.';
    if (!form.project.trim())    e.project    = 'Project description is required.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type:'', msg:'' });
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      setAlert({ type:'error', msg:'Please fill in all required fields.' });
      return;
    }

    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k,v]) => fd.append(k, v));
      if (newImage) fd.append('image', newImage);

      await axios.put(`${API_URL}/${id}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setAlert({ type:'success', msg:'✅ Profile updated successfully! Redirecting…' });
      setTimeout(() => navigate(`/member/${id}`), 1800);
    } catch (err) {
      setAlert({ type:'error', msg: err.response?.data?.message || 'Failed to update member.' });
    } finally {
      setSaving(false);
    }
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) return (
    <div className="page-container">
      <div className="spinner-container"><div className="spinner" /><span>Loading member data…</span></div>
    </div>
  );

  // Displayed image: new preview > existing backend image > fallback
  const displayImg = preview
    || (currentImage && !imgErr ? `${BACKEND}${currentImage}` : null);

  return (
    <div className="page-container">
      <div className="page-heading">
        <div className="badge">Edit Profile</div>
        <h1>Edit Member</h1>
        <p>Update the details below and save to apply changes.</p>
      </div>

      {alert.msg && (
        <div className={`alert alert-${alert.type}`}>{alert.msg}</div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:'1.75rem', alignItems:'start' }}>

          {/* ── Left col ── */}
          <div>
            {/* Personal */}
            <div className="panel" style={{ marginBottom:'1.5rem' }}>
              <div className="panel-title">Personal Information</div>

              <div className="grid-2">
                {/* Name */}
                <div className="form-group">
                  <label className="form-label">Full Name <span style={{color:'#ef4444'}}>*</span></label>
                  <input name="name" value={form.name} onChange={handle}
                    placeholder="Full Name"
                    className={`form-input${errors.name?' error':''}`} />
                  {errors.name && <div className="form-error-text">⚠ {errors.name}</div>}
                </div>

                {/* Roll Number */}
                <div className="form-group">
                  <label className="form-label">Roll Number <span style={{color:'#ef4444'}}>*</span></label>
                  <input name="rollNumber" value={form.rollNumber} onChange={handle}
                    placeholder="e.g. 22CS047"
                    className={`form-input${errors.rollNumber?' error':''}`} />
                  {errors.rollNumber && <div className="form-error-text">⚠ {errors.rollNumber}</div>}
                </div>
              </div>

              <div className="grid-2">
                {/* Year */}
                <div className="form-group">
                  <label className="form-label">Year <span style={{color:'#ef4444'}}>*</span></label>
                  <select name="year" value={form.year} onChange={handle}
                    className={`form-input form-select${errors.year?' error':''}`}>
                    <option value="">Select Year</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                  {errors.year && <div className="form-error-text">⚠ {errors.year}</div>}
                </div>

                {/* Degree */}
                <div className="form-group">
                  <label className="form-label">Degree <span style={{color:'#ef4444'}}>*</span></label>
                  <input name="degree" value={form.degree} onChange={handle}
                    placeholder="e.g. B.Tech CSE"
                    className={`form-input${errors.degree?' error':''}`} />
                  {errors.degree && <div className="form-error-text">⚠ {errors.degree}</div>}
                </div>
              </div>
            </div>

            {/* Academic */}
            <div className="panel" style={{ marginBottom:'1.5rem' }}>
              <div className="panel-title">Academic &amp; Professional Details</div>

              {FIELDS.filter(f => !['name','rollNumber','degree'].includes(f.name)).map(f => (
                <div className="form-group" key={f.name}>
                  <label className="form-label">
                    {f.label}{f.required && <span style={{color:'#ef4444'}}> *</span>}
                  </label>
                  {f.type === 'textarea' ? (
                    <textarea
                      name={f.name}
                      value={form[f.name]}
                      onChange={handle}
                      placeholder={f.placeholder}
                      rows={3}
                      className={`form-input form-textarea${errors[f.name]?' error':''}`}
                    />
                  ) : (
                    <input
                      name={f.name}
                      value={form[f.name]}
                      onChange={handle}
                      placeholder={f.placeholder}
                      className={`form-input${errors[f.name]?' error':''}`}
                    />
                  )}
                  {errors[f.name] && <div className="form-error-text">⚠ {errors[f.name]}</div>}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display:'flex', gap:'0.75rem' }}>
              <button id="btn-save" type="submit" className="btn btn-primary btn-lg"
                disabled={saving} style={{ flex:1 }}>
                {saving ? (
                  <><span className="spinner" style={{width:18,height:18,borderWidth:2}} /> Saving…</>
                ) : '💾  Save Changes'}
              </button>
              <button type="button" className="btn btn-secondary btn-lg"
                onClick={() => navigate(`/member/${id}`)}>
                Cancel
              </button>
            </div>
          </div>

          {/* ── Right col — photo ── */}
          <div className="panel" style={{ position:'sticky', top:'86px' }}>
            <div className="panel-title">Profile Photo</div>

            <div style={{ textAlign:'center', marginBottom:'1.25rem' }}>
              {displayImg ? (
                <img
                  src={displayImg}
                  alt="Preview"
                  onError={() => setImgErr(true)}
                  style={{
                    width:'140px', height:'140px',
                    objectFit:'cover',
                    objectPosition:'top center',
                    borderRadius:'50%',
                    border:'3px solid var(--gold-400)',
                    boxShadow:'0 6px 24px rgba(251,191,36,0.35)',
                  }}
                />
              ) : (
                <div style={{
                  width:'140px', height:'140px', borderRadius:'50%',
                  background:'rgba(251,191,36,0.06)',
                  border:'2px dashed var(--border-gold)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'3rem', margin:'0 auto',
                }}>👤</div>
              )}
              {preview && (
                <div style={{
                  marginTop:'0.5rem', fontSize:'0.72rem',
                  color:'var(--gold-300)', fontWeight:600,
                }}>
                  ✦ New photo selected
                </div>
              )}
              {!preview && currentImage && (
                <div style={{
                  marginTop:'0.5rem', fontSize:'0.72rem',
                  color:'var(--text-muted)',
                }}>
                  Current photo
                </div>
              )}
            </div>

            <div className="file-input-wrapper">
              <label className="file-input-label" htmlFor="edit-image">
                <span className="upload-icon">📷</span>
                <span className="upload-text">
                  {newImage ? newImage.name : 'Click to replace photo'}
                </span>
                <span className="upload-hint">JPG · PNG · WEBP · Max 5 MB</span>
              </label>
              <input id="edit-image" type="file" accept="image/*" onChange={handleImage} />
            </div>

            {errors.image && (
              <div className="form-error-text" style={{marginTop:'0.5rem'}}>⚠ {errors.image}</div>
            )}
            {newImage && <div className="file-preview">✅ {newImage.name}</div>}

            <div className="divider" />
            <ul style={{fontSize:'0.77rem',color:'var(--text-muted)',lineHeight:1.8,paddingLeft:'1rem'}}>
              <li>Leave blank to keep existing photo</li>
              <li>Upload a new file to replace it</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditMember;
