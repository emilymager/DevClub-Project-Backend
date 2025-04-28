require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const eventRoutes = require('./src/lib/event/event.route');
app.use('/events', eventRoutes);


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Failed to connect to MongoDB:', error));


app.get('/', (req, res) => {
    res.send('Server is running and connected to MongoDB!');
});


const PORT = process.env.PORT;
app.listen(PORT, async () => {
    console.log(`Server running`);
});
