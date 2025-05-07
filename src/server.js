require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
// const errorHandler = require('./middlewares/error');

//connect to db
connectDB();

const app = express();

// CORS configuration
const corsOptions = {
    origin: process.env.CLIENT_URL || '*', // Allow the client URL or all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

//middleware
app.use(cors(corsOptions)); // Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/campaigns', require('./routes/campaign'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/users', require('./routes/user'));
app.use('/api/rewards', require('./routes/reward'));
app.use('/api/badges', require('./routes/badge'));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running' });
  });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));