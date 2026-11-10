const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    appointmentDate: {
      type: Date,
      required: [true, 'Please specify an appointment date']
    },
    timeSlot: {
      type: String,
      required: [true, 'Please specify a time slot (e.g., 10:00 AM)']
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending'
    },
    reason: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// 🚀 Database Indexes for Performance & Constraints:
// 1. Indexing doctor and date so scheduling conflict checks are extremely fast
appointmentSchema.index({ doctor: 1, appointmentDate: 1 });

// 2. Indexing patient to quickly fetch a user's appointment history
appointmentSchema.index({ patient: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);