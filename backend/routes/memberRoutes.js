const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Member = require('../models/Member');

// ─── Multer Storage Config ────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, gif, webp) are allowed!'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter,
});

// ─── POST /api/members ────────────────────────────────────────────────────────
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, rollNumber, year, degree, project, hobbies, certificate, internship, aboutYourAim } = req.body;

    if (!name || !rollNumber || !year || !degree || !project) {
      return res.status(400).json({ success: false, message: 'Name, Roll Number, Year, Degree, and Project are required.' });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    const member = new Member({
      name,
      rollNumber,
      year,
      degree,
      project,
      hobbies: hobbies || '',
      certificate: certificate || '',
      internship: internship || '',
      aboutYourAim: aboutYourAim || '',
      image: imagePath,
    });

    const savedMember = await member.save();
    res.status(201).json({ success: true, data: savedMember });
  } catch (error) {
    console.error('Error creating member:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error while creating member.' });
  }
});

// ─── GET /api/members ─────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: members.length, data: members });
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching members.' });
  }
});

// ─── GET /api/members/:id ─────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found.' });
    }
    res.status(200).json({ success: true, data: member });
  } catch (error) {
    console.error('Error fetching member:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid member ID format.' });
    }
    res.status(500).json({ success: false, message: 'Server error while fetching member.' });
  }
});

// ─── PUT /api/members/:id ─────────────────────────────────────────────────────
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found.' });
    }

    const { name, rollNumber, year, degree, project, hobbies, certificate, internship, aboutYourAim } = req.body;

    if (!name || !rollNumber || !year || !degree || !project) {
      return res.status(400).json({ success: false, message: 'Name, Roll Number, Year, Degree, and Project are required.' });
    }

    // Only update image path if a new file was uploaded
    const imagePath = req.file ? `/uploads/${req.file.filename}` : member.image;

    const updated = await Member.findByIdAndUpdate(
      req.params.id,
      {
        name,
        rollNumber,
        year,
        degree,
        project,
        hobbies:      hobbies      || '',
        certificate:  certificate  || '',
        internship:   internship   || '',
        aboutYourAim: aboutYourAim || '',
        image:        imagePath,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating member:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid member ID format.' });
    }
    res.status(500).json({ success: false, message: error.message || 'Server error while updating member.' });
  }
});

module.exports = router;
