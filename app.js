import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import supplierRoutes from './src/lib/supplier/supplier.route.js';
import reviewRoutes from './src/lib/review/review.route.js';


dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));


app.use('/api', supplierRoutes);  
app.use('/api', reviewRoutes);


app.get('/', (req, res) => {
  res.send('Server is running and connected to MongoDB!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
