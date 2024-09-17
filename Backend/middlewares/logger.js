const { createLogger, format, transports } = require('winston');
const path = require('path');
const { combine, timestamp, json, errors } = format;

// Logger setup
const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),      // Add timestamp to log entries
    errors({ stack: true }), // Capture stack trace in logs
    json()            // Output logs in JSON format for easy parsing
  ),
  transports: [
    new transports.Console(), // Logs to the console (for development)
    new transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'error' }), // Error log file
    new transports.File({ filename: path.join(__dirname, '../logs/combined.log') })  // General log file
  ]
});

// Middleware to log all requests
const requestLogger = (req, res, next) => {
  logger.info(`Method: ${req.method}, URL: ${req.url}, IP: ${req.ip}, Status: ${res.statusCode}`);
  next();
};

module.exports = { logger, requestLogger };
