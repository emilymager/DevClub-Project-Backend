import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  supplierType: {
    type: String,
    enum: [
      'Photographer', 'Magnet Photographer', 'Catering Service', 'DJ',
      'Security', 'Lighting Technician / Lighting Setup', 'Bartender / Bar Services',
      'Florist / Flower Decoration', 'Furniture Rental', 'Balloon Artist / Kids Entertainment',
      'Live Musicians', 'Private Chef / Live Food Stations', 'Makeup Artist',
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
