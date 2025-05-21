import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  supplierType: {
    type: String,
    enum: [
      'DJ',
      'Lecturer',
      'Alcohol products',
      'Catering',
      'Photographer',
      'Live Band',
      'Stand-up Comedian',
      'Dancers',
      'Private Chef',
      'Cocktail Bar',
      'Coffee Barista',
      'Magnet Photos',
      'Balloon Artist',
      'Table Styling',
      'Security Guard',
      'Cleaning Service'
    ],
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