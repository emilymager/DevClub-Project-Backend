import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import supplierRoutes from './src/lib/supplier/supplier.route.js'; 
import userRoutes from './src/lib/user/user.route.js'; 
import evePicRoutes from './src/lib/eventpicture/eventpicture.route.js'; 
import eventRoutes from './src/lib/event/event.route.js'; 
import reviewRoutes from './src/lib/review/review.route.js';
import aiAssistantRoute from './src/lib/aiAssustant/aiAssistant.route.js';
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

const serviceAccountPath = path.resolve('./src/config/serviceAccountKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,             
  })
);

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

app.use('/supplier', supplierRoutes);
app.use('/user', userRoutes);
app.use('/eventpicture', evePicRoutes);
app.use('/event', eventRoutes);
app.use('/review', reviewRoutes);
app.use('/eventAssistant', aiAssistantRoute);

app.get('/', (req, res) => {
  res.send('Server is running and connected to MongoDB!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
