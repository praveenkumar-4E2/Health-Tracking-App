const express = require("express");
const healthRecordsRoutes = require("./routes/healthRecordRoutes")
const { requestLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware to log all incoming requests
app.use(requestLogger)

// Middleware to parse incoming request body
app.use(express.json());

// Health records routes
app.use('/health-records', healthRecordsRoutes);

// Use centralized error handler for uncaught errors
app.use(errorHandler)
module.exports = app;
