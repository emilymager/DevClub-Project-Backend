import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  rank: {
    type: Number,
    required: true
  },
  user: {
    type: String, 
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  description: String
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
