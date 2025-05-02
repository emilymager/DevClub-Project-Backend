import mongoose from 'mongoose';

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

      date: {
        type: Date,
      },

      location: {
        type: String,
      },

      description: {
        type: String,
      },

      eventType:{
        type: String,
        enum: ['wedding', 'music festival', 'birthday', 'bar mitzva', 'bat mitzva', 'outdoor rave', 'concert', 'stand-up'],
        required: true
      },

      budget: {
        type: Number,
      },

      visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'private'
      }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

export default Event;
