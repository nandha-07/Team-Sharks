const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    rollNumber: {
      type: String,
      required: [true, 'Roll Number is required'],
      trim: true,
    },
    year: {
      type: String,
      required: [true, 'Year is required'],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, 'Degree is required'],
      trim: true,
    },
    project: {
      type: String,
      required: [true, 'Project is required'],
      trim: true,
    },
    hobbies: {
      type: String,
      trim: true,
    },
    certificate: {
      type: String,
      trim: true,
    },
    internship: {
      type: String,
      trim: true,
    },
    aboutYourAim: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Member', memberSchema);
