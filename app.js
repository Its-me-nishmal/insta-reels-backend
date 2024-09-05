const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

const videoRoutes = require('./routes/videoRoutes');
app.use('/api', videoRoutes);

module.exports = app;
