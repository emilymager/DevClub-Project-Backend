const mongoose = require('mongoose');
const User = require('../user/user.model');


const eventPicSchema = new mongoose.Schema({
  user: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String,
    required: true
  }
}, { timestamps: true });

const EventPicture = mongoose.model('EventPicture', eventPicSchema);

module.exports = EventPicture;
