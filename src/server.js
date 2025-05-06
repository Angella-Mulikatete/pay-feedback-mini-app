require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
// const errorHandler = require('./middlewares/error');

//connect to db
connectDB();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/campaigns', require('./routes/campaign'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/users', require('./routes/user'));

// // Error handler
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));