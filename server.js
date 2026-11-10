const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Mount Auth Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Base test route
app.get('/', (req, res) => {
  res.json({ message: 'AHAS Backend API is connected successfully!' });
});

// Define Port and Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[Server Running]: Server is listening on port ${PORT}`);
});