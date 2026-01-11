import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  supplierType: {
    type: String,
    enum: [
      'Photographer', 'Magnet Photographer', 'Catering Service', 'DJ',
      'Security', 'Lighting Setup', 'Bar Services',
      'Florist', 'Furniture Rental', 'Balloon Artist',
      'Live Musicians', 'Private Chef', 'Makeup Artist',
      'Transportation Services', 'Graphic Designer'
    ],
    required: true
  },
  name: String,
  image: String,
  rank: Number,
  host: {
  type: String, 
  required: true
  },
  description: String,
  history: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }]
}, { timestamps: true });

const Supplier = mongoose.model('Supplier', supplierSchema);

export default Supplier;
