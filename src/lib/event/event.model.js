import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  host: {
    type: String, 
    required: true
  },
  participants: [{
    type: String 
  }],
  suppliers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier'
  }],
  invitationPicture: String,
  date: Date,
  location: String,
  title: String,
  description: String,
  eventType: {
    type: String,
    enum: [
      'wedding', 'music festival', 'birthday', 'bar mitzva', 'bat mitzva',
      'outdoor rave', 'concert', 'stand-up'
    ],
    required: true
  },
  budget: Number,
  visibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'private'
  },
  eventPictures: [String]
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

export default Event;
