const express = require('express');
const cors = require('cors');
require('dotenv/config');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Import Routes
const guestRoute = require('./routes/guestRoute');
app.use('/api', guestRoute);

// Jalankan server
app.listen(8000, () => console.log('🚀 Running on port 8000'));

