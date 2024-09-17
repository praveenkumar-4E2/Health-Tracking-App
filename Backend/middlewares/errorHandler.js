const { logger } = require('./logger');

// Centralized error handler middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'Server Error';

  // Log the error
  logger.error({
    message: errorMessage,
    statusCode,
    stack: err.stack,
    route: req.url,
    method: req.method,
    ip: req.ip
  });

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: errorMessage
  });
};

module.exports = errorHandler;
