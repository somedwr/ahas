const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true, // Database constraint: prevents duplicate emails
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6
    },
    role: {
      type: String,
      enum: ['patient', 'doctor', 'admin'],
      default: 'patient'
    }
  },
  {
    timestamps: true
  }
);

// Indexing email for fast lookups during login/registration
userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);