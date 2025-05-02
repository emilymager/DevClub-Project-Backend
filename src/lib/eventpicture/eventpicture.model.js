import mongoose from 'mongoose';
import User from'../user/user.model.js';


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

export default EventPicture;