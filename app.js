require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const supplierRoutes = require('./src/lib/supplier/supplier.route'); 

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));


app.use('/api', supplierRoutes);  


app.get('/', (req, res) => {
  res.send('Server is running and connected to MongoDB!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
