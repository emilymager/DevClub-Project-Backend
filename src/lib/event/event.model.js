const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  invitationPicture: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  eventType: {
    type: String,
    enum: [
      'party_public', 'party_private',
      'lecture_public', 'lecture_private',
      'workshop_public', 'workshop_private',
      'other_public', 'other_private'
    ],
    required: true
  },
  budget: {
    type: Number,
  },
  eventId: {
    type: Number,
    required: true
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
