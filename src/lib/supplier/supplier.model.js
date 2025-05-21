import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  supplierType: {
    type: String,
    enum: ['DJ', 'catering', 'photographer'],
    required: true
  },
  name: {
    type: String
  },
    image: {
    type: String
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



