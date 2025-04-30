import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  rank: {
    type: Number,
    required: true,
    // min: 1,
    // max: 5
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  description: {
    type: String
  }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;