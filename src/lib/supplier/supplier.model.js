import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  supplierType: {
    type: String,
    enum: ['dj', 'catering', 'photographer'],
    required: true
  },
  rank: {
    type: Number,
    //required: true
  },
  description: {
    type: String
  },
  history: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }]
}, { timestamps: true });

const Supplier = mongoose.model('Supplier', supplierSchema);

export default Supplier;



