const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactionRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const fetchAndSeedData = require('./services/fetchDataService');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

// Connect to MongoDB
// console.log('MongoDB URI:', process.env.MONGO_URI);
connectDB();

// Seed the database (run when needed)
// fetchAndSeedData();

const app = express();

// Body parser middleware
app.use(express.json());

// Routes
app.use('/api', transactionRoutes);
app.use('/api', statisticsRoutes);
app.get('/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
  });

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
