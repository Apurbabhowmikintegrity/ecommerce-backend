const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const dotenv = require('dotenv');
const db = require('./db/database');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors({ origin: process.env.CLIENT_URL || '*' })); // Secure CORS policy
app.use(helmet()); // Security headers
app.use(compression()); // Response compression
app.use(morgan('combined')); // HTTP request logging

// Main Route
app.get('/', async (req, res) => {
    res.status(200).json({ message: 'Server is ready' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
    db();
    console.log(`🚀 Server running on port ${PORT}`);
});
